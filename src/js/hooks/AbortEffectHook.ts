import { useEffect, type DependencyList, type EffectCallback } from "react";

export default function useAbortEffect(effect: (signal: AbortSignal) => ReturnType<EffectCallback>, deps?: DependencyList) {
    useEffect(() => {
        const abortController = new AbortController;
        const destructor = effect(abortController.signal);
        return () => {
            abortController.abort();
            destructor?.();
        }
    }, deps)
}