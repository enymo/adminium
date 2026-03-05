import clsx from "clsx"
import type { Key, ReactNode } from "react"

export default function AttributeList({
    items,
    className
}:{ 
    items: {
        key?: Key,
        label: ReactNode,
        value: ReactNode
    }[]
    className?: string
}) {
    return (
        <table className={clsx("border-collapse text-left flex-1 text-text-800", className)}>
            <tbody>
                {items.map(({key, label, value}, index) => (
                    <tr key={key ?? index}>
                        <th className={clsx("body-m-md pr-6 pt-3 pb-3", {
                            "border-t border-neutral-200 pb-0": index > 0
                        })}>{label}</th>
                        <td className={clsx("body-m", {
                            "border-t border-neutral-200": index > 0
                        })}>{value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}