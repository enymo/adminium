import { useMemo } from "react";
import { useLocation, useSearchParams } from "react-router";

export default function useAtLocation(target?: string) {
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const isAtLocation = useMemo(() => {
        if (target === undefined) {
            return false;
        }

        const url = new URL(target, window.location.origin);
        if (location.pathname.startsWith(url.pathname)) {
            for (const [key, value] of url.searchParams.entries()) {
                if (searchParams.get(key) !== value) {
                    return false;
                }
            }
            return true;
        }

        return false;
    }, [location, searchParams, target]);

    return isAtLocation;
}