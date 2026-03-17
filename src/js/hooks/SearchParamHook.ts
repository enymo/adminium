import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { useSanitizedNumber, useSanitizedNumbers, useSanitizedString, useSanitizedStrings } from "./SanitizedParamHook";

export function useSearchParamString<T extends string | null>(key: string, allowed: T[], defaultValue: T): [T, (value: T) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    const value = useSanitizedString(searchParams.get(key), allowed, defaultValue, [searchParams]);

    const setValue = useCallback((value: T) => {
        setSearchParams(searchParams => {
            if (value === null) {
                searchParams.delete(key);
            }
            else {
                searchParams.set(key, value);
            }
            return searchParams;
        });
    }, [setSearchParams]);

    return [value, setValue];
}

export function useSearchParamStrings<T extends string>(key: string, allowed: T[]): [T[], (value: T[]) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    const value = useSanitizedStrings(searchParams.getAll(`${key}[]`), allowed, [searchParams]);

    const setValue = useCallback((values: T[]) => {
        setSearchParams(searchParams => {
            searchParams.delete(`${key}[]`);
            for (const value of values) {
                searchParams.append(`${key}[]`, value);
            }
            return searchParams;
        });
    }, [setSearchParams]);

    return [value, setValue];
}

export function useSerachParamNumber<T extends number | null>(key: string, options: {min?: number, max?: number}, defaultValue: T): [T, (value: T) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    const value = useSanitizedNumber(searchParams.get(key), options, defaultValue, [searchParams]);

    const setValue = useCallback((value: T) => {
        setSearchParams(searchParams => {
            if (value === null) {
                searchParams.delete(key);
            }
            else {
                searchParams.set(key, value.toString());
            }
            return searchParams;
        })
    }, [setSearchParams]);

    return [value, setValue];
}

export function useSearchParamNumbers(key: string, options: {min?: number, max?: number} = {}, defaultValue?: number): [number[], (value: number[]) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    const value = useSanitizedNumbers(searchParams.getAll(`${key}[]`), options, defaultValue, [searchParams]);

    const setValue = useCallback((values: number[]) => {
        setSearchParams(searchParams => {
            searchParams.delete(`${key}[]`);
            for (const value of values) {
                searchParams.append(`${key}[]`, value.toString());
            }
            return searchParams;
        })
    }, [setSearchParams]);

    return [value, setValue];
}