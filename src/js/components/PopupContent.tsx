import clsx from "clsx";
import { type ReactNode } from "react";

export default function PopupContent({ className, title, children }: {
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