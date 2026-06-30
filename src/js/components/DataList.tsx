import clsx from "clsx"
import type { Key, ReactNode } from "react"

export function DataList({
    className,
    items
}: {
    className?: string,
    items: {
        key?: Key,
        label: ReactNode,
        value: ReactNode
    }[][]
}) {
    return (
        <table className={clsx("border-collapse", className)}>
            <tbody>
                {items.flatMap((items, i) => items.map(({key, label, value}, j) => (
                    <tr key={key}>
                        <td className={clsx("body-m text-text-800 pr-10", {
                            [j > 0 ? "pt-2.5" : "pt-8"]: i > 0 || j > 0
                        })}>{label}:</td>
                        <td className={clsx("body-m-md text-text-800", {
                            [j > 0 ? "pt-2.5" : "pt-8"]: i > 0 || j > 0
                        })}>{value}</td>
                    </tr>
                )))}
            </tbody>
        </table>
    )
}