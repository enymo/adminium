import { createContext } from "@enymo/react-better-context";
import globalDayjs, { type ConfigType, Dayjs, type OptionType } from "dayjs";
import { type ReactNode, useCallback } from "react";
import { useTranslation } from "react-i18next";

type DayjsFunction = (date?: ConfigType, format?: OptionType, strict?: boolean) => Dayjs

const [Provider, useDayjs] = createContext<DayjsFunction>(globalDayjs);

export { useDayjs };
export default function DayjsProvider({children}: {
    children: ReactNode
}) {
    const { i18n } = useTranslation();
    const dayjs = useCallback<DayjsFunction>((date, format, strict) => globalDayjs(date, format, strict).locale(i18n.language), [i18n.language]);

    return (
        <Provider value={dayjs}>
            {children}
        </Provider>
    )
}