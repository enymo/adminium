import clsx from "clsx"
import { useMemo } from "react"
import { useDayjs } from "../providers/DayjsProvider"
import type { ChatAttachmentType } from "./ChatAttachment"
import ChatAttachment from "./ChatAttachment"

export interface ChatMessageProps {
    className?: string
    date: Date
    message: string
    sender: {
        name: string
        avatar: string | null
    }
    attachments: ChatAttachmentType[]
    showNameAndTimestamp: boolean
    showAvatar: boolean
    incoming: boolean
}

export default function ChatMessage({
    className,
    date,
    message,
    sender,
    attachments,
    showNameAndTimestamp,
    showAvatar,
    incoming
}: ChatMessageProps) {
    const dayjs = useDayjs();

    const initials = useMemo(() => {
        const index = sender.name.lastIndexOf(" ");
        if (index !== -1) {
            return sender.name[0] + sender.name[index + 1];
        }
        else {
            return sender.name[0];
        }
    }, [sender.name])

    return (
        <div className={clsx("flex gap-3", incoming ? "flex-row-reverse" : "flex-row", className)}>
            <div className="flex flex-col gap-2 max-w-100">
                {showNameAndTimestamp && (
                    <div className={clsx("mt-6.5 flex flex-row gap-3 items-center", incoming ? "ml-4" : "mr-4 self-end")}>
                        <div className="body-xs-md text-text-700">{sender.name}</div>
                        <div className="body-xs text-text-600">{dayjs(date).format("HH:mm")}</div>
                    </div>
                )}
                <div 
                    className={clsx("px-4 py-3 flex flex-col gap-3 rounded-2xl body-m text-text-900",
                        {
                            "bg-bg-600": incoming,
                            "bg-primary-100": !incoming,
                            "rounded-bl-md": incoming && showAvatar,
                            "rounded-br-md": !incoming && showAvatar
                        }
                    )}
                >
                    {message}
                    {attachments.length > 0 && (
                        <div className={clsx("flex flex-col gap-1.5", incoming ? "" : "self-end")}>
                            {attachments.map((attachment) => (
                                <ChatAttachment {...attachment} sent={true} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-10 sm:w-12.5 flex flex-col justify-end">
                {showAvatar && (sender.avatar ? (
                    <img src={sender.avatar} className="rounded-full aspect-square object-cover" alt="" />
                ) : (
                    <div className="flex justify-center items-center rounded-full aspect-square bg-primary-400 text-white body-lg-md uppercase">
                        {initials}
                    </div>
                ))}
            </div>
        </div>
    )
}