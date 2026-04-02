export { Chevron as ChevronDown } from "@enymo/bcc";
import type { Icon } from "@enymo/bcc";


export let EllipsisVertical: Icon;
export let Filter: Icon;
export let Gear: Icon;
export let RightFromBracket: Icon;
export let ChevronLeft: Icon;
export let ChevronRight: Icon;
export let ArrowUpRight: Icon;
export let ArrowDownRight: Icon;
export let ArrowUpLong: Icon;
export let ArrowDownLong: Icon;
export let XMark: Icon;
export let MagnifyingGlass: Icon;
export let ToastSuccess: Icon;
export let ToastWarning: Icon;
export let Paperclip: Icon;

type IconName = "ellipsisVertical" | "filter" | "gear" | "rightFromBracket" | "chevronLeft" | "chevronRight" | "arrowUpLong" | "arrowDownLong" | "xMark" | "arrowUpRight" | "arrowDownRight" | "magnifyingGlass" | "toastSuccess" | "toastWarning" | "paperclip";
export function configureAdminIcons({
    ellipsisVertical,
    filter,
    gear,
    rightFromBracket,
    chevronLeft,
    chevronRight,
    arrowUpRight,
    arrowDownRight,
    arrowUpLong,
    arrowDownLong,
    xMark,
    magnifyingGlass,
    toastSuccess,
    toastWarning,
    paperclip
}: Record<IconName, Icon>) {
    EllipsisVertical = ellipsisVertical;
    Filter = filter;
    Gear = gear;
    RightFromBracket = rightFromBracket;
    ChevronLeft = chevronLeft;
    ChevronRight = chevronRight;
    ArrowUpRight = arrowUpRight;
    ArrowDownRight = arrowDownRight;
    ArrowUpLong = arrowUpLong;
    ArrowDownLong = arrowDownLong;
    XMark = xMark;
    MagnifyingGlass = magnifyingGlass;
    ToastSuccess = toastSuccess;
    ToastWarning = toastWarning;
    Paperclip = paperclip;
}