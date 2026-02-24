import { configureIcons } from "@enymo/bcc";
import "../css/storybook.css";
import CheckIcon from "../svg/check-solid-full.svg?react";
import ChevronDown from "../svg/chevron-down-solid-full.svg?react";
import CircleExclamationIcon from "../svg/circle-exclamation-solid-full.svg?react";
import CircleNotchIcon from "../svg/circle-notch-solid-full.svg?react";
import CircleQuestionIcon from "../svg/circle-question-regular-full.svg?react";
import EllispisVerticalIcon from "../svg/ellipsis-vertical-solid-full.svg?react";
import FilterIcon from "../svg/filter-solid-full.svg?react";
import { configureAdminIcons } from "./icons";

configureIcons({
    chevron: ChevronDown,
    tooltip: CircleQuestionIcon,
    error: CircleExclamationIcon,
    spinner: CircleNotchIcon,
    check: CheckIcon
});

configureAdminIcons({
    ellipsisVertical: EllispisVerticalIcon,
    filter: FilterIcon
});

export const sleep = (duration: number) => new Promise<void>(resolve => setTimeout(resolve, duration));