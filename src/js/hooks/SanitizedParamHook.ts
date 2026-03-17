import { isNotNull } from "@enymo/ts-nullsafe";
import { type DependencyList, useMemo } from "react";

export function useSanitizedString<T extends string | null>(input: string | null | undefined, allowed: T[], defaultValue: T, dependencies: DependencyList = []): T {
    return useMemo(() => isNotNull(input) && allowed.includes(input as any) ? input as T : defaultValue, [input, ...dependencies]);
}

export function useSanitizedNumber<T extends number | null>(input: string | number | null | undefined, {min, max}: {min?: number, max?: number}, defaultValue: T, dependencies: DependencyList = []): T {
    return useMemo(() => {
        if (isNotNull(input)) {
            if (typeof input === "string") {
                input = Number(input);
            }
            if (!isNaN(input) && (min === undefined || input >= min) && (max === undefined || input <= max)) {
                return input as T;
            }
        }
        return defaultValue;
    }, [input, ...dependencies]);
}

export function useSanitizedNumbers(input: string[] | number[] | null | undefined, {min, max}: {min?: number, max?: number}, defaultValue?: number, dependencies: DependencyList = []): number[] {
    return useMemo(() => {
        if (isNotNull(input)) {
            return input.map(value => {
                if (typeof value === "string") {
                    value = Number(value);
                }
                if (!isNaN(value) && (min === undefined || value >= min) && (max === undefined || value <= max)) {
                    return value;
                }
                return defaultValue;
            }).filter(value => value !== undefined);
        }
        return [];
    }, dependencies);
}

export function useSanitizedStrings<T extends string>(input: string[] | null | undefined, allowed: T[], dependencies: DependencyList = []): T[] {
    return useMemo(() => {
        if (isNotNull(input)) {
            const set = new Set(allowed);
            return input.filter(value => set.has(value as T)) as T[];
        }
        return [];
    }, dependencies);
}