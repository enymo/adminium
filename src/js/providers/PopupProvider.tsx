import { createRequiredContext } from "@enymo/react-better-context";
import { assertNotNull } from "@enymo/ts-nullsafe";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import { Popup, PopupActions, PopupContent } from "../components/Popup";
import { type MaybePromise, type RequiredBy } from "../utilities";

export interface Config {
    type: "info" | "confirm",
    variant: "normal" | "danger",
    title: ReactNode,
    text: ReactNode,
    confirm?: ReactNode,
    cancel?: ReactNode,
    dismissable?: boolean,
    onConfirm?: () => MaybePromise<Config | void>,
    onCancel?: () => MaybePromise<Config | void>
}

interface ConfigState extends RequiredBy<Config, "confirm" | "cancel" | "dismissable"> {
    resolve: (result: boolean) => void
}

type Show = (config: Config) => Promise<boolean>

const [Provider, usePopup] = createRequiredContext<Show>("PopupProvider must be present in component tree");
export { usePopup };
export default function PopupProvider({children}: {
    children: ReactNode
}) {
    const {t} = useTranslation();
    const defaultConfig = useMemo<Required<Pick<Config, "confirm" | "cancel" | "dismissable">>>(() => ({
        confirm: t("confirm"),
        cancel: t("cancel"),
        dismissable: true
    }), [t]);
    const [config, setConfig] = useState<ConfigState | null>(null);

    const show = useCallback<Show>(config => new Promise<boolean>(resolve => setConfig({
        resolve,
        ...defaultConfig,
        ...config
    })), [setConfig]);

    const handleClick = async (result: boolean) => {
        assertNotNull(config);
        const next = await (result ? config.onConfirm?.() : config.onCancel?.());
        if (next !== undefined) {
            setConfig({
                resolve: config.resolve,
                ...defaultConfig,
                ...next
            });
        }
        else {
            config.resolve(result);
            setConfig(null);
        }
    }

    return <>
        <Provider value={show}>
            {children}
        </Provider>
        {config !== null && (
            <Popup
                onBackgroundClick={config.dismissable ? () => handleClick(false) : undefined}
            >
                <PopupContent title={config.title}>
                    <p className="body-m">{config.text}</p>
                </PopupContent>
                <PopupActions align={config.type === "info" ? "end" : "space"}>
                    {config.type === "confirm" && (
                        <Button variant="secondary" onClick={() => handleClick(false)}>{config.cancel}</Button>
                    )}
                    <Button variant={config.variant === "normal" ? "primary" : "danger"} onClick={() => handleClick(true)}>{config.confirm}</Button>
                </PopupActions>
            </Popup>
            )}
    </>
}

