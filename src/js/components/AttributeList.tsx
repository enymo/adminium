import clsx from "clsx"
import type { Key, ReactNode } from "react"

export default function AttributeList({
    items,
    className
}:{ 
    items: {
        key?: Key,
        label: ReactNode,
        value: ReactNode,
        multiline?: boolean
    }[]
    className?: string
}) {
    return (
        <table className={clsx("border-collapse text-left flex-1 text-text-800", className)}>
            <tbody>
                {items.map(({key, label, value, multiline = false}, index) => (
                    <tr key={key ?? index} className={multiline ? "align-top" : "align-middle"}>
                        <th className={clsx("body-m-md py-3 pr-6", {
                            "border-t border-neutral-200 pb-0": index > 0
                        })}>{label}</th>
                        <td className={clsx("body-m py-3", {
                            "border-t border-neutral-200": index > 0,
                            "whitespace-pre-wrap": multiline
                        })}>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}