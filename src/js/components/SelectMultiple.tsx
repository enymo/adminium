import { CheckboxInput, InputFrame } from "@enymo/bcc";
import { CheckboxList } from "@enymo/glissade";
import useOnClickOutside from "@enymo/react-click-outside-hook";
import useHybridInput from "@enymo/react-hybrid-input-hook";
import { requireNotNull } from "@enymo/ts-nullsafe";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RegisterOptions } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ChevronDown, XMark } from "../icons";

export default function SelectMultiple<T extends string | number>({
    className,
    name,
    value: externalValue,
    onChange: externalOnChange,
    options,
    placeholder,
    choices,
    label: inputLabel,
    error: externalError,
    showTags = false,
    showMultiple = 1,
    large = false
}: {
    className?: string,
    name?: string,
    value?: T[],
    onChange?: (value: T[]) => void,
    options?: RegisterOptions,
    placeholder?: string,
    choices: {
        label: string,
        value: T
    }[],
    label?: string,
    error?: string,
    showTags?: boolean,
    showMultiple?: number,
    large?: boolean
}) {
    const { t } = useTranslation();
    const { value, onChange, error } = useHybridInput({ name, externalValue, externalOnChange, externalError, options, defaultValue: [] });
    const activeChoices = useMemo(() => {
        const map = new Map(choices.map(choice => [choice.value, choice]));
        return value.map(item => map.get(item)).filter(item => item !== undefined);
    }, [value, choices]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const ref = useOnClickOutside<HTMLDivElement>(() => {
        setOpen(false);
        setSearch("");
    }, [setOpen, setSearch]);

    const inputRef = useRef<HTMLInputElement>(null);

    const filteredChoices = useMemo(
        () => search ? choices.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase())) : choices,
        [choices, search]
    );
    const label = useMemo(() => value.length === 0 ? (
        placeholder
    ) : value.length <= showMultiple ? (
        value.map(single => requireNotNull(choices.find(choice => choice.value === single), "unable to find choice").label).join(", ")
    ) : (
        t("selectMultiple.selected", { amount: value.length })
    ), [value, placeholder, choices]);

    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [inputRef, open]);

    return (
        <InputFrame label={inputLabel} className={className} error={error}>
            <div ref={ref} className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder={t("search")}
                    className={clsx("w-full h-8.5 rounded-md bg-bg-100 pl-2.5 pr-8 body-m placeholder:text-text-200 border border-primary-500", {
                        "hidden": !open
                    })}
                />
                <button type="button" onClick={() => setOpen(true)} className={clsx("w-full h-8.5 rounded-md bg-bg-100 flex items-center pl-2.5 pr-8 body-m border border-neutral-300 hover:border-neutral-400", {
                    "hidden": open
                })}>
                    {label}
                </button>
                <ChevronDown className="w-3 fill-neutral-500 absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" />
                {open && (
                    <div className={clsx("absolute inset-x-0 top-[calc(100%+2px)] rounded-md bg-bg-100 z-10 shadow-dropdown flex flex-col px-3.5 py-3 gap-4 overflow-auto", large ? "max-h-88" : "max-h-44")}>
                        <CheckboxList value={value} onChange={onChange}>
                            {filteredChoices.length > 0 ? filteredChoices.map(({ value, label }) => (
                                <CheckboxInput key={value} value={value}>{label}</CheckboxInput>
                            )) : (
                                <span className="body-m text-text-200 italic">{t("selectMultiple.noResults")}</span>
                            )}
                        </CheckboxList>
                    </div>
                )}
            </div>
            {showTags && (
                <div className="flex mt-3 gap-x-1.5 gap-y-1 flex-wrap">
                    {activeChoices.map(({ value: choiceValue, label }) => (
                        <div key={choiceValue} className="h-5 rounded-md px-1.5 flex items-center gap-1 bg-bg-700 text-2xs text-text-700">
                            {label}
                            <button type="button" className="cursor-pointer" onClick={() => onChange(value.filter(item => item !== choiceValue))}>
                                <XMark className="size-2.5 fill-neutral-500" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </InputFrame>
    )
}