import { CheckboxInput, Error, InputFrame } from "@enymo/bcc";
import { CheckboxList } from "@enymo/glissade";
import useOnClickOutside from "@enymo/react-click-outside-hook";
import useHybridInputHook from "@enymo/react-hybrid-input-hook";
import { useId, useMemo, useState } from "react";
import { type RegisterOptions } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "../icons";

export default function FilterDropdown<T extends string | number>({
    className,
    name,
    options,
    label,
    value: externalValue,
    onChange: externalOnChange,
    groups,
    error: externalError
}: {
    className?: string,
    name?: string,
    options?: RegisterOptions,
    label?: string,
    value?: T[],
    onChange?: (value: T[]) => void,
    groups: {
        key: string,
        label?: string,
        items: {
            label: string,
            value: T
        }[]
    }[],
    error?: string
}) {
    const { t } = useTranslation();
    const id = useId();
    const { value, onChange, error } = useHybridInputHook({ name, externalValue, externalOnChange, externalError, options, defaultValue: [] });
    const [open, setOpen] = useState(false);

    const ref = useOnClickOutside<HTMLDivElement>(() => setOpen(false), [setOpen]);

    const activeItems = useMemo(() => {
        const map = new Map(groups.flatMap(({ items }) => items.map(item => [item.value, item])));
        return value.map(value => map.get(value));
    }, [groups, value]);

    const activeLabel = useMemo(() => {
        if (activeItems.length === 0) {
            return t("filterDropdown.none");
        }
        else if (activeItems.length === 1) {
            return activeItems[0]!.label;
        }
        else {
            return t("filterDropdown.multiple");
        }
    }, [activeItems]);

    return (
        <InputFrame id={id} className={className} error={error} label={label}>
            <div ref={ref} className="w-full relative">
                <button onClick={() => setOpen(!open)} className="w-full h-7.5 px-2.5 flex items-center justify-between body-s bg-bg-100 rounded-md border border-neutral-300 hover:border-neutral-400 focus:border-primary-500">
                    {activeLabel}
                    <ChevronDown className="size-3 fill-neutral-500" />
                </button>
                {open && (
                    <CheckboxList value={value} onChange={onChange}>
                        <div className="z-10 absolute top-[calc(100%+4px)] inset-x-0 rounded-md bg-bg-100 shadow-dropdown px-3.5 py-5 flex flex-col gap-4.5">
                            {groups.map(({ key, label, items }) => (
                                <div key={key} className="flex flex-col gap-4.5">
                                    {label && <span className="body-s-md">{label}</span>}
                                    <div className="flex flex-col gap-4">
                                        {items.map(({ label, value }) => (
                                            <CheckboxInput key={value} value={value}>{label}</CheckboxInput>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {error && <Error>{error}</Error>}
                        </div>
                    </CheckboxList>
                )}
            </div>
        </InputFrame>
    )
}