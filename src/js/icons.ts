import type { Icon } from "@enymo/bcc";


export let EllipsisVertical: Icon;
export let Filter: Icon;
export let Gear: Icon;
export let RightFromBracket: Icon;

type IconName = "ellipsisVertical" | "filter" | "gear" | "rightFromBracket";
export function configureAdminIcons({
    ellipsisVertical,
    filter,
    gear,
    rightFromBracket
}: Record<IconName, Icon>) {
    EllipsisVertical = ellipsisVertical;
    Filter = filter;
    Gear = gear;
    RightFromBracket = rightFromBracket;
}