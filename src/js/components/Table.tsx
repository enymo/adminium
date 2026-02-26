import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckboxInput } from "@enymo/bcc";
import { CheckboxList } from "@enymo/glissade";
import clsx from "clsx";
import { type ReactNode, useCallback } from "react";
import { ArrowDownLong, ArrowUpLong } from "../icons";

export interface SortBy<T extends string> {
    column: T,
    direction: "asc" | "desc"
}

export type DndHandler<T extends string | number = string | number> = (from: T, to: T, direction: "up" | "down") => void

function TableHead({ className, border = false, colSpan, children }: {
    className?: string,
    border?: boolean,
    colSpan?: number,
    children?: ReactNode
}) {
    return <th className={clsx("h-9 bg-bg-400 shadow-table body-s-md border-b border-neutral-200 align-middle text-left", {
        "border-r": border
    }, className)} colSpan={colSpan}>{children}</th>
}

function TableData({ className, border = false, colSpan, children }: {
    className?: string,
    border?: boolean,
    colSpan?: number,
    children?: ReactNode
}) {
    return <td className={clsx("min-h-12 py-2.5 bg-bg-100 border-b border-neutral-200 align-middle", {
        "border-r": border
    }, className)} colSpan={colSpan}>{children}</td>
}

function TableRow({ id, draggable, disableDnd, selectable, data }: {
    id: number | string,
    draggable: boolean,
    disableDnd: boolean,
    selectable: boolean,
    data: {
        className?: string,
        colSpan?: number
        children: ReactNode
    }[]
}) {
    const {
        attributes,
        listeners,
        transform,
        transition,
        setNodeRef,
        isDragging
    } = useSortable({
        id,
        disabled: !draggable || disableDnd
    });

    return (
        <tr
            ref={disableDnd ? undefined : setNodeRef}
            style={{
                transform: CSS.Translate.toString(transform),
                transition
            }}
        >
            {selectable && (
                <TableData className="px-8" border>
                    <CheckboxInput value={id} />
                </TableData>
            )}
            {draggable && (
                <TableData>
                    {!disableDnd && (
                        <div className="flex justify-center">
                            <button className={clsx("grid grid-cols-2 gap-0.5", isDragging ? "cursor-grabbing" : "cursor-grab")} {...attributes} {...listeners}>
                                {Array<void>(8).fill().map((_, index) => <div key={index} className="size-1 rounded-full bg-neutral-300" />)}
                            </button>
                        </div>
                    )}
                </TableData>
            )}
            {data.map(({ className, colSpan, children }, index) => (
                <TableData key={index} className={clsx("pr-3 last:pr-8", {
                    "pl-8": index > 0 || !draggable
                }, className)} colSpan={colSpan}>{children}</TableData>
            ))}
        </tr>
    )
}

export default function Table<T extends string, U extends string | number>({
    className,
    head,
    rows,
    sortBy,
    onChangeSortBy,
    onDragDrop,
    selected,
    onChangeSelected
}: {
    className?: string,
    head: {
        name?: T,
        label?: ReactNode,
        colSpan?: number,
        fill?: boolean
    }[],
    rows: {
        id: U,
        disableDnd?: boolean,
        data: {
            className?: string,
            colSpan?: number,
            children: ReactNode
        }[]
    }[],
    sortBy?: SortBy<T>,
    onChangeSortBy?: (sortBy: SortBy<T>) => void,
    onDragDrop?: DndHandler<U>,
    selected?: U[],
    onChangeSelected?: (selected: U[]) => void
}) {
    const handleDragDrop = useCallback((e: DragEndEvent) => {
        if (e.over && e.over.id !== e.active.id) {
            onDragDrop?.(e.active.id as U, e.over.id as U, e.delta.y > 0 ? "down" : "up");
        }
    }, [onDragDrop]);

    const handleChangeSortBy = (name: T) => () => {
        if (sortBy && onChangeSortBy) {
            onChangeSortBy({
                column: name,
                direction: sortBy.column === name && sortBy.direction === "asc" ? "desc" : "asc"
            });
        }
    }

    return (
        <DndContext onDragEnd={handleDragDrop} modifiers={[restrictToVerticalAxis]}>
            <CheckboxList value={selected} onChange={onChangeSelected}>
                <table className={clsx("border-collapse whitespace-nowrap", className)}>
                    <thead>
                        <tr>
                            {selected && onChangeSelected && (
                                <TableHead className="px-8" border>
                                    <CheckboxInput
                                        checked={selected.length === rows.length}
                                        onChange={value => onChangeSelected(value ? rows.map(({ id }) => id) : [])}
                                    />
                                </TableHead>
                            )}
                            {onDragDrop && (
                                <TableHead>
                                    <div className="w-11" />
                                </TableHead>
                            )}
                            {head.map(({ name, label, colSpan, fill }, index) => (
                                <TableHead key={index} colSpan={colSpan} className={clsx("pr-3 last:pr-8", {
                                    "pl-8": index > 0 || onDragDrop === undefined,
                                    "w-full": fill
                                })}>
                                    {name && sortBy && onChangeSortBy ? (
                                        <button className="flex items-center gap-1 fill-neutral-600" type="button" onClick={handleChangeSortBy(name)}>
                                            {label}
                                            {sortBy.column === name ? (sortBy.direction === "asc" ? (
                                                <ArrowUpLong className="w-1.5" />
                                            ) : (
                                                <ArrowDownLong className="w-1.5" />
                                            )) : <div className="w-1.5" />}
                                        </button>
                                    ) : label}
                                </TableHead>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="body-m-md">
                        <SortableContext disabled={onDragDrop === undefined} items={rows.filter(({ disableDnd }) => !disableDnd)} strategy={verticalListSortingStrategy}>
                            {rows.map(({ id, disableDnd = false, data }) => (
                                <TableRow
                                    key={id}
                                    id={id}
                                    disableDnd={disableDnd}
                                    draggable={onDragDrop !== undefined}
                                    selectable={selected !== undefined && onChangeSelected !== undefined}
                                    data={data}
                                />
                            ))}
                        </SortableContext>
                    </tbody>
                </table>
            </CheckboxList>
        </DndContext>
    )
}