import { requireNotNull } from "@enymo/ts-nullsafe";
import { produce } from "immer";
import { DndHandler } from "./components/Table";
import { LinkedListNode, ResourceLinkedListNode } from "./linkedList";
import { Node } from "./types";

export function simpleDndSorting<T extends Node>(data: T[], setData: (data: T[]) => void): DndHandler {
    return (fromId, toId, direction) => {
        setData(produce(data, draft => {
            const fromIndex = draft.findIndex(({id}) => id === fromId);
            if (fromIndex === -1) throw new Error("DnD sorting from element not found in data");
            const from = requireNotNull(draft.splice(fromIndex, 1)[0], "from element not found");
            const toIndex = draft.findIndex(({id}) => id === toId);
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

export function resourceDndSorting<T extends ResourceLinkedListNode>(data: T[], update: (id: T["id"], update: {previous_id: T["previous_id"]}, updateMethod: "immediate" | "local-only") => void): DndHandler {
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