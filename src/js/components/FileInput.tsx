import { Error } from "@enymo/bcc";
import useHybridInput from "@enymo/react-hybrid-input-hook";
import clsx from "clsx";
import { useRef } from "react";
import { type RegisterOptions } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "../utilities";
import BaseFileInput, { type FileInputRef } from "./FileInputHandler";

export default function FileInput({
    className,
    url,
    filename,
    value: externalValue,
    onChange: externalOnChange,
    name,
    options,
    label,
    error: externalError,
    accept
}: {
    className?: string,
    url?: string,
    filename?: string,
    value?: File | null,
    onChange?: (file: File | null) => void,
    name?: string,
    options?: RegisterOptions,
    label?: string,
    error?: string,
    accept?: string
}) {
    const { t } = useTranslation();
    const ref = useRef<FileInputRef>(null);
    const { value, onChange, error } = useHybridInput({ externalValue, externalOnChange, name, options, externalError, defaultValue: null });

    return (
        <div className={clsx("flex flex-col gap-4", className)}>
            <label className="heading-s">{label}</label>
            <div className="flex-1 justify-between flex flex-col items-start gap-2.5">
                {(value !== null || filename !== undefined) && (
                    <div className="flex flex-col gap-1">
                        <span className="body-m">{value?.name ?? filename}</span>
                        {value === null && url && (
                            <a className="body-m-md text-primary-500" href={url}>{t("download")}</a>
                        )}
                    </div>
                )}
                <Button variant="secondary" onClick={() => ref.current?.open()}>{t("upload")}</Button>
            </div>
            {error && <Error>{error}</Error>}
            <BaseFileInput ref={ref} accept={accept} onSelected={([file]) => onChange(file!)} />
        </div>
    )
}