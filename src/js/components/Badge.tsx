import classNames from "classnames";

export default function Badge({className, variant, children}: {
    className?: string,
    variant: "neutral" | "primary" | "success" | "warning" | "error",
    children: string
}) {
    return (
        <div className={classNames("h-6 flex items-center px-1.5 text-xs rounded-md", {
            "bg-bg-900 text-text-600": variant === "neutral",
            "bg-primary-100 text-primary-700": variant === "primary",
            "bg-success-100 text-success-700": variant === "success",
            "bg-warning-100 text-warning-700": variant === "warning",
            "bg-error-100 text-error-700": variant === "error"
        }, className)}>{children}</div>
    )
}