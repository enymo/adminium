export { Chevron as ChevronDown } from "@enymo/bcc";
import type { FC, SVGProps } from "react";

export type Icon = FC<SVGProps<SVGSVGElement>>;

export let EllipsisVertical: Icon;
export let Filter: Icon;
export let ChevronLeft: Icon;
export let ChevronRight: Icon;

type IconName = "ellipsisVertical" | "filter" | "chevronLeft" | "chevronRight";
export function configureAdminIcons({
    ellipsisVertical,
    filter,
    chevronLeft,
    chevronRight
}: Record<IconName, Icon>) {
    EllipsisVertical = ellipsisVertical;
    Filter = filter;
    ChevronLeft = chevronLeft;
    ChevronRight = chevronRight;
}