import { Chevron } from "@enymo/bcc";
import { Clickable } from "@enymo/react-clickable-router";
import clsx from "clsx";
import { Fragment, type ReactNode } from "react";

export interface Breadcrumb {
    onClick?: () => void,
    to?: string,
    children: ReactNode
}

export default function Breadcrumbs({className, breadcrumbs}: {
    className?: string,
    breadcrumbs: Breadcrumb[]
}) {
    return (
        <div className={clsx("flex gap-2 items-center px-8 border-b border-neutral-100 h-14", className)}>
            {breadcrumbs.map(({onClick, to, children}, index) => (
                <Fragment key={index}>
                    {index > 0 && <Chevron className="-rotate-90 w-4 fill-neutral-500" />}
                    <Clickable
                        className={onClick || to ? "body-l" : "body-l-md"}
                        to={to}
                        onClick={onClick}
                    >{children}</Clickable>
                </Fragment>
            ))}
        </div>
    )
}