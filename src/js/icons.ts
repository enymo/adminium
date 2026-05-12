export { Chevron as ChevronDown } from "@enymo/bcc";
import type { Icon } from "@enymo/bcc";

const missingIcons = () => {
    throw new Error(`The icons for the adminium have not been configured! Please configure the icons by calling 'configureIcons' when booting your application`);
}

export let EllipsisVertical: Icon = missingIcons;
export let FilterIcon: Icon = missingIcons;
export let Gear: Icon = missingIcons;
export let RightFromBracket: Icon = missingIcons;
export let ChevronLeft: Icon = missingIcons;
export let ChevronRight: Icon = missingIcons;
export let ArrowUpRight: Icon = missingIcons;
export let ArrowDownRight: Icon = missingIcons;
export let ArrowUpLong: Icon = missingIcons;
export let ArrowDownLong: Icon = missingIcons;
export let XMark: Icon = missingIcons;
export let MagnifyingGlass: Icon = missingIcons;
export let ToastSuccess: Icon = missingIcons;
export let ToastWarning: Icon = missingIcons;
export let Paperclip: Icon = missingIcons;
export let Download: Icon = missingIcons;
export let Pdf: Icon = missingIcons;
export let FaceSmile: Icon = missingIcons;
export let PaperPlane: Icon = missingIcons;

type IconName = "ellipsisVertical" | "filter" | "gear" | "rightFromBracket" | "chevronLeft" | "chevronRight" | "arrowUpLong" | "arrowDownLong" | "xMark" | "arrowUpRight" | "arrowDownRight" | "magnifyingGlass" | "toastSuccess" | "toastWarning" | "paperclip" | "download" | "pdf" | "facesmile" | "paperplane";
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
    paperclip,
    download,
    pdf,
    facesmile,
    paperplane
}: Record<IconName, Icon>) {
    EllipsisVertical = ellipsisVertical;
    FilterIcon = filter;
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
    Download = download;
    Pdf = pdf;
    FaceSmile = facesmile;
    PaperPlane = paperplane;
}