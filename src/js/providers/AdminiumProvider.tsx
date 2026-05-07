import type { ReactNode } from "react";
import { PopupProvider } from "./PopupProvider";
import { ToasterProvider } from "./ToasterProvider";

export function AdminiumProvider({ children }: {
    children: ReactNode
}) {
    return (
        <ToasterProvider>
            <PopupProvider>
                {children}
            </PopupProvider>
        </ToasterProvider>
    )
}