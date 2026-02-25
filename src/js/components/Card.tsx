import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ArrowDownRight, ArrowUpRight } from "../icons";

export default function Card({
    title,
    value,
    previous,
    period
}: {
    title: string,
    value?: number,
    previous?: number,
    period: "day" | "week" | "month" | "year" | "other"
}) {
    const { t, i18n } = useTranslation();

    return (
        <div className="rounded bg-bg-100 border-neutral-200 border px-5 py-4 flex flex-col gap-2">
            <span className="body-l-md text-text-700">{title}</span>
            <div className="flex gap-2.5 items-center">
                <span className="heading-l">{value?.toLocaleString(i18n.language, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1
                }) ?? "-"}</span>
                {value !== undefined && previous !== undefined && (
                    <div className={clsx("flex items-center gap-1.5 text-sm font-medium", value > previous ? "text-success-500 fill-success-500" : "text-error-500 fill-error-500")}>
                        {value > previous ? <ArrowUpRight className="w-3" /> : <ArrowDownRight className="w-3" />}
                        {Math.abs((1 - value / previous) * 100).toLocaleString(i18n.language, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 1
                        })} %
                    </div>
                )}
            </div>
            <div className="flex items-center gap-1.5">
                <span className="body-s">{t(`dashboard.period.${period}`)}:</span>
                <span className="body-s-md">{previous?.toLocaleString(i18n.language, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1
                }) ?? "-"}</span>
            </div>
        </div>
    )
}