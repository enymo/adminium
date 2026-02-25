import { requireNotNull } from "@enymo/ts-nullsafe";
import { produce } from "immer";
import type { DndHandler } from "./components/Table";

export const byId = <T>(id: T) => (item: {
    id: T
}) => item.id === id

export interface Node {
    id: number | string
}

export interface LinkedListNode extends Node {
    previous_id: number | string | null
}

export interface ResourceLinkedListNode {
    id?: number | string,
    previous_id: number | string | null
}

export function getLastLinkedListItem<T extends LinkedListNode>(list: T[]): T | null {
    const nodeWithNextIds = new Set(list.map(({ previous_id }) => previous_id));
    return list.find(({ id }) => !nodeWithNextIds.has(id)) ?? null;
}

export function sortLinkedList<T extends LinkedListNode>(list: T[]): T[] {
    const result: T[] = [];
    const map = new Map<T["id"], T>(list.map(node => [node.id, node]));
    let currentNode = getLastLinkedListItem(list);
    while (currentNode !== null) {
        result.push(currentNode);
        currentNode = currentNode.previous_id === null ? null : map.get(currentNode.previous_id) ?? null;
    }
    return result.reverse();
}

export async function deleteResourceLinkedListItem<T extends ResourceLinkedListNode>(list: T[], id: T["id"], update: (id: T["id"], update: { previous_id: T["previous_id"] }, updateMethod: "local-only") => Promise<void>, destroy: (id: T["id"]) => Promise<void>) {
    const node = requireNotNull(list.find(node => node.id === id), "Resource linked list deletion node not found");
    const next = list.find(node => node.previous_id === id);

    await destroy(id);

    if (next !== undefined) {
        update(next.id, {
            previous_id: node.previous_id
        }, "local-only");
    }
}

export function deleteLinkedListItem<T extends LinkedListNode>(list: T[], id: T["id"]): T[] {
    return produce(list, draft => {
        const index = draft.findIndex(byId(id));
        if (index === -1) throw new Error("Unable find element to remove");
        const removed = requireNotNull(draft.splice(index, 1)[0], "item to remove does not exist");
        const next = draft.find(({ previous_id }) => previous_id === id);
        if (next) {
            next.previous_id = removed.previous_id;
        }
    });
}

export function simpleDndSorting<T extends Node>(data: T[], setData: (data: T[]) => void): DndHandler {
    return (fromId, toId, direction) => {
        setData(produce(data, draft => {
            const fromIndex = draft.findIndex(({ id }) => id === fromId);
            if (fromIndex === -1) throw new Error("DnD sorting from element not found in data");
            const from = requireNotNull(draft.splice(fromIndex, 1)[0], "from element not found");
            const toIndex = draft.findIndex(({ id }) => id === toId);
            if (toIndex === -1) throw new Error("DnD sorting to element not found in data");
            draft.splice(direction === "down" ? toIndex + 1 : toIndex, 0, from);
        }));
    }
}

export function defaultDndSorting<T extends LinkedListNode>(data: T[], setData: (data: T[]) => void): DndHandler {
    return (fromId, toId, direction) => {
        setData(produce(data, draft => {
            const from = requireNotNull(draft.find(node => node.id === fromId), "DnD sorting from element not found in data");
            const fromNext = draft.find(node => node.previous_id === fromId);
            const [toNext, toPrevious] = direction === "down" ? [
                draft.find(node => node.previous_id === toId),
                draft.find(node => node.id === toId)
            ] : (() => {
                const toNext = draft.find(node => node.id === toId);
                return [
                    toNext,
                    draft.find(node => node.id === toNext?.previous_id)
                ]
            })();

            if (fromNext !== undefined) {
                fromNext.previous_id = from.previous_id;
            }
            if (toNext !== undefined) {
                toNext.previous_id = from.id;
            }
            from.previous_id = toPrevious?.id ?? null;
        }));
    }
}

export function resourceDndSorting<T extends ResourceLinkedListNode>(data: T[], update: (id: T["id"], update: { previous_id: T["previous_id"] }, updateMethod: "immediate" | "local-only") => void): DndHandler {
    return (fromId, toId, direction) => {
        const from = requireNotNull(data.find(node => node.id === fromId), "DnD sorting from element not found in data");
        const fromNext = data.find(node => node.previous_id === fromId);
        const [toNext, toPrevious] = direction === "down" ? [
            data.find(node => node.previous_id === toId),
            data.find(node => node.id === toId)
        ] : (() => {
            const toNext = data.find(node => node.id === toId);
            return [
                toNext,
                data.find(node => node.id === toNext?.previous_id)
            ]
        })()

        if (fromNext !== undefined) {
            update(fromNext.id, {
                previous_id: from.previous_id
            }, "local-only");
        }

        if (toNext !== undefined) {
            update(toNext.id, {
                previous_id: from.id as T["previous_id"]
            }, "local-only");
        }

        return update(from.id, {
            previous_id: toPrevious?.id ?? null,
        }, "immediate");
    }
}