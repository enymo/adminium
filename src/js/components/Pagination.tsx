import type { Icon } from "@enymo/bcc";
import clsx from "clsx";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "../icons";

function PaginationButton({icon: Icon, ...props}: {
    icon: Icon,
    onClick: () => void,
    disabled: boolean
}) {
    return (
        <button type="button" className="size-5 rounded bg-neutral-200 disabled:bg-neutral-200 fill-neutral-500 hover:bg-neutral-300 flex items-center justify-center" {...props}>
            <Icon className="w-3.5" />
        </button>
    )
}

export default function Pagination({className, page, onChangePage, itemsPerPage, totalItems, borderBottom = false}: {
    className?: string,
    page: number,
    onChangePage: (page: number) => void,
    itemsPerPage: number,
    totalItems: number,
    borderBottom?: boolean
}) {
    const {t} = useTranslation();
    const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage]);

    const handlePrevious = () => {
        if (page > 1) {
            onChangePage(page - 1);
        }
    }

    const handleNext = () => {
        if (page < totalPages) {
            onChangePage(page + 1);
        }
    }

    return (
        <div className={clsx("h-9 flex items-center justify-between body-s text-text-500 px-8 shadow-table border-neutral-200 bg-bg-400", borderBottom ? "border-b" : "border-t", className)}>
            {t("pagination.items", {perPage: Math.min(itemsPerPage, totalItems), total: totalItems})}
            <div className="flex gap-3 items-center">
                <PaginationButton disabled={page <= 1} onClick={handlePrevious} icon={ChevronLeft} />
                {t("pagination.page", {page, total: totalPages})}
                <PaginationButton disabled={page >= totalPages} onClick={handleNext} icon={ChevronRight} />
            </div>
        </div>
    )
}