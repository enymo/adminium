import clsx from "clsx";
import React from "react";

export default function PopupActions({ className, align = "space", children }: {
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