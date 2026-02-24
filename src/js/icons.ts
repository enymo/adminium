export { Chevron as ChevronDown } from "@enymo/bcc";
import type { Icon } from "@enymo/bcc";


export let EllipsisVertical: Icon;
export let Filter: Icon;
export let Gear: Icon;
export let RightFromBracket: Icon;
export let ChevronLeft: Icon;
export let ChevronRight: Icon;

type IconName = "ellipsisVertical" | "filter" | "gear" | "rightFromBracket" | "chevronLeft" | "chevronRight";
export function configureAdminIcons({
    ellipsisVertical,
    filter,
    gear,
    rightFromBracket,
    chevronLeft,
    chevronRight
}: Record<IconName, Icon>) {
    EllipsisVertical = ellipsisVertical;
    Filter = filter;
    Gear = gear;
    RightFromBracket = rightFromBracket;
    ChevronLeft = chevronLeft;
    ChevronRight = chevronRight;
}