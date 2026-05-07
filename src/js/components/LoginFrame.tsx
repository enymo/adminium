import type { ReactNode } from "react";

export function LoginFrame({
    logo,
    title,
    children
}: {
    logo?: ReactNode,
    title: string,
    children: ReactNode
}) {
    return (
        <div className="flex flex-col grow items-center justify-center bg-primary-100">
            <div className="flex flex-col w-105 bg-bg-100 px-6 pt-6 pb-8 rounded-xl shadow-card">
                {logo && (
                    <div className="self-center">{logo}</div>
                )}
                <h1 className="text-center heading-xl text-text-900 mt-11 mb-6">{title}</h1>
                {children}
            </div>
        </div>
    )
}