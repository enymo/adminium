import { createContext } from "@enymo/react-better-context";
import globalDayjs, { type ConfigType, type Dayjs, type OptionType } from "dayjs";

export type DayjsFunction = (date?: ConfigType, format?: OptionType, strict?: boolean) => Dayjs

export const [DayjsContextProvider, useDayjs] = createContext<DayjsFunction>(globalDayjs);