import useOnClickOutside from "@enymo/react-click-outside-hook";
import { Clickable, type ClickableProps } from "@enymo/react-clickable-router";
import clsx from "clsx";
import { useState } from "react";
import { EllipsisVertical } from "../icons";

interface Item extends ClickableProps {
    variant?: "normal" | "danger"
}

export default function DotsDropdown({className, variant = "small", items
}: {
    className?: string,
    variant?: "small" | "large" 
    items: Item[]
}) {
    const [open, setOpen] = useState(false);
    const ref = useOnClickOutside<HTMLDivElement>(() => setOpen(false), [setOpen]);
    
    return (
        <div ref={ref} className={clsx("relative", className)}>
            <button type="button" onClick={() => setOpen(!open)} className={clsx(
                "cursor-pointer flex justify-center items-center",
                {
                    [open ? "bg-neutral-400 fill-white w-4.5 h-6 rounded" : "bg-bg-600 hover:bg-bg-800 fill-neutral-600 w-4.5 h-6 rounded"]: variant === "small",
                    [open ? "bg-neutral-400 fill-white w-6.5 h-8.5 rounded-lg" : "bg-bg-100 hover:bg-bg-800 fill-neutral-600 w-6.5 h-8.5 rounded-lg"]: variant === "large",
                }
            )}>
                <EllipsisVertical className={clsx({
                    "h-3": variant === "small",
                    "h-5": variant === "large"
                })} />
            </button>
            {open && (
                <div className="z-10 rounded-md shadow-dropdown bg-bg-100 absolute top-[calc(100%+4px)] -right-1 flex flex-col gap-0.5 px-2 py-2.5">
                    {items.map(({variant = "normal", children, ...props}, index) => (
                        <Clickable key={index} {...props} className={clsx(
                            "cursor-pointer flex items-center rounded h-8 px-2.5 body-m hover:bg-bg-500 whitespace-nowrap",
                            {
                                "text-text-700 hover:text-text-800": variant === "normal",
                                "text-danger-500": variant === "danger"
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