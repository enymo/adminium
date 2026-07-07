import { useMemo } from "react";

export function useActiveFilters(...filters: any[]) {
    return useMemo(() => filters.reduce((sum, item) => (Array.isArray(item) ? item.length > 0 : item) ? sum + 1 : sum, 0), filters);
}