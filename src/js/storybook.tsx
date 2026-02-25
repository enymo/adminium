import { configureIcons } from "@enymo/bcc";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { MemoryRouter } from "react-router";
import "../css/storybook.css";
import de from "../lang/de.json";
import ArrowDownLong from "../svg/arrow-down-long-solid-full.svg?react";
import ArrowUpLong from "../svg/arrow-up-long-solid-full.svg?react";
import CheckIcon from "../svg/check-solid-full.svg?react";
import ChevronDown from "../svg/chevron-down-solid-full.svg?react";
import ChevronLeft from "../svg/chevron-left-solid-full.svg?react";
import ChevronRight from "../svg/chevron-right-solid-full.svg?react";
import CircleExclamationIcon from "../svg/circle-exclamation-solid-full.svg?react";
import CircleNotchIcon from "../svg/circle-notch-solid-full.svg?react";
import CircleQuestionIcon from "../svg/circle-question-regular-full.svg?react";
import EllispisVerticalIcon from "../svg/ellipsis-vertical-solid-full.svg?react";
import FilterIcon from "../svg/filter-solid-full.svg?react";
import GearIcon from "../svg/gear-solid-full.svg?react";
import RightFromBracketIcon from "../svg/right-from-bracket-solid-full.svg?react";
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
    filter: FilterIcon,
    gear: GearIcon,
    rightFromBracket: RightFromBracketIcon,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    arrowUpLong: ArrowUpLong,
    arrowDownLong: ArrowDownLong
});

i18next
    .use(initReactI18next)
    .init({
        debug: true,
        lng: "de",
        fallbackLng: "de",
        resources: {
            de: {
                translation: de
            }
        },
        react: {
            useSuspense: false
        },
        interpolation: {
            escapeValue: false
        }
    });

export const sleep = (duration: number) => new Promise<void>(resolve => setTimeout(resolve, duration));

export const withMemoryRouter = (initialEntry?: string) => (Story: React.FC) => (
    <MemoryRouter initialEntries={initialEntry ? [initialEntry] : undefined}>
        <Story />
    </MemoryRouter>
)