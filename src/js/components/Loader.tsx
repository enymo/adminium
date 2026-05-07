import { Spinner } from "@enymo/bcc";
import clsx from "clsx";
import React from "react";

export function Loader({className, ...props}: React.SVGProps<SVGSVGElement>) {
    return <Spinner className={clsx("animate-spin", className)} {...props} />
}