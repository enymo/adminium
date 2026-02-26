import clsx from "clsx";

export default function PeriodSelect<T extends string>({
    value,
    onChange,
    choices
}: {
    value: T | null,
    onChange: (value: T) => void,
    choices: {
        label: string,
        value: T
    }[]
}) {
    return (
        <div className="rounded-lg border-neutral-200 border overflow-hidden flex h-9">
            {choices.map(({ label, value: currentValue }) => (
                <button
                    key={currentValue}
                    onClick={() => onChange(currentValue)}
                    className={clsx(
                        "px-2 body-m-md border-neutral-200 border-l first:border-l-0",
                        value === currentValue ? "bg-primary-50 text-primary-500" : "bg-bg-300 text-text-500"
                    )}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}