import { createRequiredContext } from "@enymo/react-better-context";
import type { ReactNode } from "react";

export interface ToastOptions {
    title: ReactNode,
    body: ReactNode,
    variant: "success" | "error",
    duration: number
}

export const [ToasterContextProvider, useToaster] = createRequiredContext<(options: ToastOptions) => void>("ToasterProvider must be present in component tree");