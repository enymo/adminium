import { useMemo } from "react";

export function useActiveFilters<T>(...filters: T[]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => filters.reduce((sum, item) => (Array.isArray(item) ? item.length > 0 : item) ? sum + 1 : sum, 0), filters);
}