import { Error } from "@enymo/bcc";
import useHybridInput from "@enymo/react-hybrid-input-hook";
import clsx from "clsx";
import { useRef, useState } from "react";
import { type RegisterOptions } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "../utilities";
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
    error: externalError
}: {
    className?: string,
    imageClassName?: string,
    src?: string,
    value?: File,
    onChange?: (file: File) => void,
    name?: string,
    options?: RegisterOptions,
    label?: string,
    error?: string
}) {
    const { t } = useTranslation();
    const ref = useRef<FileInputRef>(null);
    const { value, onChange, error } = useHybridInput({ externalValue, externalOnChange, name, options, externalError });
    const [prevValue, setPrevValue] = useState<File>();
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
                {(objectUrl ?? src) !== undefined && <img className={imageClassName} src={objectUrl ?? src} />}
                <Button variant="secondary" onClick={() => ref.current?.open()}>{t("upload")}</Button>
            </div>
            <Error>{error}</Error>
            <FileInput ref={ref} accept="image/*" onSelected={([file]) => onChange(file!)} />
        </div>
    )
}