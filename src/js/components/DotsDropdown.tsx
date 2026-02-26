import useOnClickOutside from "@enymo/react-click-outside-hook";
import { Clickable, type ClickableProps } from "@enymo/react-clickable-router";
import clsx from "clsx";
import { useState } from "react";
import { EllipsisVertical } from "../icons";

interface Item extends ClickableProps {
    variant?: "normal" | "danger"
}

export default function DotsDropdown({className, items}: {
    className?: string,
    items: Item[]
}) {
    const [open, setOpen] = useState(false);
    const ref = useOnClickOutside<HTMLDivElement>(() => setOpen(false), [setOpen]);
    
    return (
        <div ref={ref} className={clsx("relative", className)}>
            <button type="button" onClick={() => setOpen(!open)} className={clsx(
                "cursor-pointer flex justify-center items-center w-4.5 h-6 rounded",
                open ? "bg-neutral-400 fill-white" : "bg-bg-600 hover:bg-bg-800 fill-neutral-600"
            )}>
                <EllipsisVertical className="h-3" />
            </button>
            {open && (
                <div className="z-10 rounded-md shadow-dropdown bg-bg-100 absolute top-[calc(100%+4px)] -right-1 flex flex-col gap-0.5 px-2 py-2.5">
                    {items.map(({variant = "normal", children, ...props}, index) => (
                        <Clickable key={index} {...props} className={clsx(
                            "cursor-pointer flex items-center rounded h-8 px-2.5 body-m hover:bg-bg-500 whitespace-nowrap",
                            {
                                "text-text-700 hover:text-text-800": variant === "normal",
                                "text-error-500": variant === "danger"
                            }
                        )}>
                            {children}
                        </Clickable>
                    ))}
                </div>
            )}
        </div>
    )
}