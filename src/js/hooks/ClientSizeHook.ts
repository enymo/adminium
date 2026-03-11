import { useRef, useState } from "react";
import useAbortEffect from "./AbortEffectHook";

export default function useClientSize<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [size, setSize] = useState<{
        width: number | undefined,
        height: number | undefined
    }>(() => ({
        width: undefined,
        height: undefined
    }));

    useAbortEffect(signal => {
        const handleResize = () => {
            if (ref.current) {
                setSize({
                    width: ref.current.clientWidth,
                    height: ref.current.clientHeight
                });
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize, {signal});
    }, [ref, setSize]);

    return [ref, size] as const;
}