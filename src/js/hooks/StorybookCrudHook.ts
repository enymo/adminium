import { useCallback, useState } from "react";
import { sleep } from "../storybook";

export interface StorybookResource {
    id: number
}

export default function useStorybookCrud<T extends StorybookResource>(initialValue: T[] | (() => T[]), sleepDuration = 2000) {
    const [state, setState] = useState(initialValue);

    const onCreate = useCallback(async (data: Omit<T, "id">) => {
        await sleep(sleepDuration);
        setState(state => [...state, {
            id: Math.max(0, ...state.map(({id}) => id)) + 1,
            ...data
        }] as T[]);
    }, [setState, sleepDuration]);

    const onUpdate = useCallback(async (id: number, data: Partial<Omit<T, "id">>) => {
        await sleep(sleepDuration);
        setState(state => state.map(item => item.id === id ? {
            ...item,
            ...data
        } : item));
    }, [setState, sleepDuration]);

    const onDelete = useCallback(async (id: number) => {
        await sleep(sleepDuration);
        setState(state => state.filter(item => item.id !== id));
    }, [setState, sleepDuration]);

    return [state, {onCreate, onUpdate, onDelete}] as const;
}