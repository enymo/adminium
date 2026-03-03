import clsx from "clsx";
import { useCallback, type MouseEventHandler, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function Popup({ className, onBackgroundClick, children }: {
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

export function PopupActions({ className, align = "space", children }: {
    className?: string,
    align?: "space" | "end",
    children: React.ReactNode
}) {
    return (
        <div className={clsx("px-7 h-16 gap-7 flex items-center bg-bg-300 rounded-b-xl", align === "space" ? "justify-between" : "justify-end", className)}>
            {children}
        </div>
    )
}

export function PopupContent({ className, title, children }: {
    className?: string,
    title?: ReactNode,
    children: ReactNode
}) {
    return (
        <div className={clsx("px-7 pt-7 pb-10", className)}>
            {title && <h1 className="heading-m mb-8">{title}</h1>}
            {children}
        </div>
    )
}