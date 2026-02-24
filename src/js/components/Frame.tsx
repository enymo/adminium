import type { Icon } from "@enymo/bcc";
import clsx from "clsx";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useAtLocation from "../hooks/AtLocationHook";
import { Gear, RightFromBracket } from "../icons";

interface MenuItemProps {
    to: string,
    icon: Icon,
    children: ReactNode
}

function MenuItem({to, icon: Icon, children}: MenuItemProps) {
    const active = useAtLocation(to);

    return (
        <Link to={to} className={clsx(
            "flex gap-4.5 items-center h-8.5 rounded-lg px-3 body-m-md",
            active ? "bg-primary-50 fill-primary-400 text-primary-500" : "fill-neutral-500 text-text-600 hover:bg-bg-500"
        )}>
            <div className="flex justify-center w-4">
                <Icon className="h-4" />
            </div>
            {children}
        </Link>
    )
}

export default function Frame({
    className,
    logo,
    items,
    user,
    onUserSettingsClick,
    onLogout,
    children
}: {
    className?: string,
    logo: ReactNode,
    items: MenuItemProps[],
    user: string,
    onUserSettingsClick?: () => void,
    onLogout?: () => void
    children: ReactNode,
}) {
    const {t} = useTranslation();

    return (
        <div className={clsx("flex", className)}>
            <div className="flex flex-col w-60 bg-bg-200 border-r border-neutral-100">
                {logo}
                <div className="flex grow flex-col px-4 gap-1.5">
                    {items.map((props, index) => (
                        <MenuItem key={index} {...props} />
                    ))}
                </div>
                <div className="flex justify-between p-4">
                    <div className="flex flex-1 gap-2.5 items-center">
                        <div className="size-8 rounded-full border-2 border-primary-400 bg-primary-300 flex items-center justify-center font-bold text-xs text-white">
                            {user.split(" ").map(([initial]) => initial).join("")}
                        </div>
                        <div className="flex flex-1 flex-col items-start">
                            <span className="body-l-md text-ellipsis overflow-hidden">{user}</span>
                            <button type="button" onClick={onLogout} className="flex gap-1.5 items-center text-xs text-text-700 hover:text-text-800 cursor-pointer">
                                <RightFromBracket className="w-3 fill-neutral-500 hover:fill-neutral-600" />
                                {t("logout")}
                            </button>
                        </div>
                    </div>
                    <button className="cursor-pointer" type="button" onClick={onUserSettingsClick}>
                        <Gear className="w-4 fill-neutral-500 hover:fill-neutral-600" />
                    </button>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    )
}