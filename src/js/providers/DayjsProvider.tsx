import globalDayjs from "dayjs";
import { type ReactNode, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { DayjsContextProvider, type DayjsFunction } from "../context/DayjsContext";

export function DayjsProvider({children}: {
    children: ReactNode
}) {
    const { i18n } = useTranslation();
    const dayjs = useCallback<DayjsFunction>((date, format, strict) => globalDayjs(date, format, strict).locale(i18n.language), [i18n.language]);

    return (
        <DayjsContextProvider value={dayjs}>
            {children}
        </DayjsContextProvider>
    )
}