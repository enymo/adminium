import clsx from "clsx";
import { useCallback, type MouseEventHandler, type ReactNode } from "react";
import { createPortal } from "react-dom";

export default function Popup({ className, onBackgroundClick, children }: {
    className?: string,
    onBackgroundClick?: () => void,
    children: ReactNode
}) {
    const handleBackgroundClick = useCallback<MouseEventHandler>(e => {
        if (e.target === e.currentTarget) {
            onBackgroundClick?.();
        }
    }, [onBackgroundClick]);

    return createPortal(
        <div className="fixed inset-0 z-50 bg-neutral-900/5 flex flex-col p-20 overflow-auto" onClick={handleBackgroundClick}>
            <div className="grow flex justify-center items-center pointer-events-none">
                <div className={clsx("rounded-xl bg-bg-100 shadow-popup pointer-events-auto", className)}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}