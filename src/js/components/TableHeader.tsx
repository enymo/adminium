import { Input } from "@enymo/bcc";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export default function TableHeader({ className, title, onSearch, filter, children }: {
    className?: string,
    title?: ReactNode,
    onSearch?: (search: string) => void,
    filter?: ReactNode,
    children?: ReactNode
}) {
    const { t } = useTranslation();

    return (
        <div className={clsx("h-16 border-b border-neutral-100 flex items-center justify-between px-8", className)}>
            <div className="flex items-center gap-8">
                {title && <h2 className="heading-m">{title}</h2>}
                {onSearch && <Input type="search" placeholder={t("search")} onSearch={onSearch} />}
                {filter}
            </div>
            {children}
        </div>
    )
}