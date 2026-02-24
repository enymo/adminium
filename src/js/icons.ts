import type { FC, SVGProps } from "react";

export type Icon = FC<SVGProps<SVGSVGElement>>;

export let EllipsisVertical: Icon;
export let Filter: Icon;

type IconName = "ellipsisVertical" | "filter";
export function configureAdminIcons({
    ellipsisVertical,
    filter
}: Record<IconName, Icon>) {
    EllipsisVertical = ellipsisVertical;
    Filter = filter;
}