import { useCallback, useMemo, type DependencyList } from "react";
import { useSearchParams } from "react-router";
import { type SortBy } from "../components/Table";

export default function usePaginator<T extends string>(defaultSortBy: SortBy<T>, deps: DependencyList = []) {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const q = searchParams.get("q") || undefined;
    const sortByName = searchParams.get("sort_by[column]");
    const sortByDirection = searchParams.get("sort_by[direction]");
    const sortBy: SortBy<T> | null = useMemo(() => sortByName !== null && sortByDirection !== null ? {
        column: sortByName as T,
        direction: sortByDirection as "asc" | "desc"
    } : defaultSortBy, [sortByName, sortByDirection, ...deps]);

    const onSearch = useCallback((search: string) => {
        const searchParams = new URLSearchParams;
        searchParams.set("page", "1");
        if (search) {
            searchParams.set("q", search);
        }
        setSearchParams(searchParams);
    }, [setSearchParams]);

    const onChangeSortBy = useCallback((sortBy: SortBy<T>) => {
        searchParams.set("page", "1");
        searchParams.set("sort_by[column]", sortBy.column);
        searchParams.set("sort_by[direction]", sortBy.direction);
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams])
    
    const onChangePage = useCallback((page: number) => {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    return {page, q, onSearch, onChangePage, sortBy, onChangeSortBy};
}