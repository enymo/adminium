import { Clickable, type ClickableProps } from "@enymo/react-clickable-router";
import clsx from "clsx";

export default function ChatPreview({
    className,
    title,
    badgeCount,
    time,
    body,
    active = false,
    onClick,
    ...props
}: {
    className?: string
    title: string
    badgeCount: number
    time: string
    body: string
    active?: boolean,
} & Omit<ClickableProps, "children">) {
    return (
        <Clickable
            className={clsx("relative h-25 border-b border-neutral-200 hover:bg-neutral-200 pt-5 px-6 pb-4.5",
                {
                    "bg-bg-100": !active,
                    "bg-primary-50": active
                },
                className
            )}
            onClick={onClick}
            {...props}
        >
            {active && (
                <div className="absolute bg-primary-400 h-20 w-0.75 left-0 -translate-y-1/2 top-1/2 rounded-br-xs rounded-tr-xs"></div>
            )}
            <div className="flex flex-col gap-2.5">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-1.5 items-center">
                        <div className="body-m-md text-text-800">{title}</div>
                        {badgeCount > 0 && (
                            <div className="rounded-md bg-primary-500 h-4 px-1.25 flex items-center text-2xs text-neutral-200">{badgeCount}</div>
                        )}
                    </div>
                    <div className="text-text-700 body-s">{time}</div>
                </div>
                <div className="line-clamp-2 body-s text-text-700">{body}</div>
            </div>
        </Clickable>
    )
}