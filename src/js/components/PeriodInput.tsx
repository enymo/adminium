import { Input } from "@enymo/bcc";
import { useTranslation } from "react-i18next";

export default function PeriodInput({
    from,
    to,
    onChangeFrom,
    onChangeTo
}: {
    from: string,
    to: string,
    onChangeFrom: (from: string) => void,
    onChangeTo: (to: string) => void
}) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center gap-4">
            <span className="body-m-md text-text-600">{t("dashboard.periodInput")}:</span>
            <div className="flex items-center gap-2.5 body-m">
                <Input type="date" value={from} onChange={onChangeFrom} />
                -
                <Input type="date" value={to} onChange={onChangeTo} />
            </div>
        </div>
    )
}