import { Error } from "@enymo/bcc";
import useHybridInput from "@enymo/react-hybrid-input-hook";
import clsx from "clsx";
import { useRef, useState, type ReactNode } from "react";
import { type RegisterOptions } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import FileInput, { type FileInputRef } from "./FileInputHandler";

export default function ImageInput({
    className,
    imageClassName,
    src,
    value: externalValue,
    onChange: externalOnChange,
    name,
    options,
    label,
    error: externalError,
    canClear = false,
    selectFileButtonLabel,
    clearFileButtonLabel
}: {
    className?: string
    imageClassName?: string
    src?: string
    value?: File | null
    onChange?: (file: File | null) => void 
    name?: string
    options?: RegisterOptions
    label?: string
    error?: string
    canClear?: boolean
    selectFileButtonLabel?: ReactNode
    clearFileButtonLabel?: ReactNode
}) {
    const { t } = useTranslation();
    const ref = useRef<FileInputRef>(null);
    const { value, onChange, error } = useHybridInput({ externalValue, externalOnChange, name, options, externalError, defaultValue: undefined });
    const [prevValue, setPrevValue] = useState<File | null>();
    const [objectUrl, setObjectUrl] = useState<string>();

    if (value !== prevValue) {
        if (objectUrl !== undefined) {
            URL.revokeObjectURL(objectUrl);
        }
        setObjectUrl(value ? URL.createObjectURL(value) : undefined);
        setPrevValue(value);
        return null;
    }

    return (
        <div className={clsx("flex flex-col gap-4", className)}>
            <label className="heading-s">{label}</label>
            <div className="flex-1 justify-between flex flex-col items-start gap-2.5">
                {value !== null && (objectUrl ?? src) !== undefined && <img className={imageClassName} src={objectUrl ?? src} />}
                <Button variant="secondary" onClick={() => ref.current?.open()}>
                    {selectFileButtonLabel ?? t("upload")}
                </Button>
                {canClear && ((src !== undefined && value !== null) || value) && (
                    <Button
                        variant="danger"
                        onClick={() => onChange(null)}
                    >{clearFileButtonLabel ?? t("remove")}</Button>
                )}
            </div>
            {error && (
                <Error>{error}</Error>
            )}
            <FileInput ref={ref} accept="image/*" onSelected={([file]) => onChange(file!)} />
        </div>
    )
}