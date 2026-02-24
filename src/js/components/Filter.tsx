import useOnClickOutside from "@enymo/react-click-outside-hook";
import clsx from "clsx";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Filter as FilterIcon } from "../icons";

export default function Filter({active, children}: {
    active: number,
    children: ReactNode
}) {
    const {t} = useTranslation();
    const [open, setOpen] = useState(false);
    const ref = useOnClickOutside<HTMLDivElement>(() => setOpen(false), [setOpen]);

    return (
        <div className="flex gap-4 items-center">
            <div ref={ref} className="relative">
                <button onClick={() => setOpen(!open)} className={clsx("cursor-pointer h-8.5 px-2.5 rounded-sm text-sm flex justify-center items-center gap-1.5", open ? "bg-neutral-400 fill-white text-white" : "bg-bg-900 text-text-700 fill-neutral-600")}>
                    <FilterIcon className="w-4" />
                    {t("filters.label")}
                </button>
                {open && (
                    <div className="bg-white absolute left-px top-[calc(100%+4px)] w-56 rounded-xs px-2.5 py-4 flex flex-col gap-3 shadow-dropdown">
                        {children}
                    </div>
                )}
            </div>
            <div className={clsx("flex items-center px-4 text-xs border-l border-neutral-100", active > 0 ? "text-text-700" : "text-text-300")}>
                {t("filters.active", {count: active})}
            </div>
        </div>
    )
}