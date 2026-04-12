import clsx from "clsx"
import { useMemo, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useDayjs } from "../providers/DayjsProvider"
import type { ChatAttachmentType } from "./ChatAttachment"
import ChatInput from "./ChatInput"
import ChatMessage from "./ChatMessage"
import type { FileInputRef } from "./FileInputHandler"
import FileInput from "./FileInputHandler"

export interface ChatMessage {
    id: number
    date: Date
    sender: {
        id: number | string
        name: string
        avatar: string | null
    }
    incoming: boolean
    message: string
    attachments: ChatAttachmentType[]
}

function ChatDateIndicator({
    date
}: {
    date: Date
}) {
    const { t } = useTranslation();

    const dayjs = useDayjs();

    const relativeDate = useMemo(() => {
        const today = dayjs().startOf("d");
        const d = dayjs(date).startOf("d"); 

        const distance = today.diff(d, "d");

        switch (distance) {
            case 0: 
                return t("date.distance.today");
            case 1: 
                return t("date.distance.yesterday");
            default: 
                return dayjs(date).format("L");
        }
    }, [date, dayjs, t])

    return (
        <div className="mt-6.5 min-w-25 border border-neutral-300 bg-bg-100 rounded-full text-2xs leading-4.5 font-medium self-center text-center">
            {relativeDate}
        </div>
    )
}

function ChatNewMessageIndicator({
    count
}: {
    count: number
}) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-row gap-2 items-center">
            <div className="flex-1 border-b border-primary-200"></div>
            <div className="test-xs text-primary-600">{t("unreadMessages.count", {count})}</div>
            <div className="flex-1 border-b border-primary-200"></div>
        </div>
    )
}

export default function Chat({
    className,
    messages,
    lastReadAt,
    attachments,
    inputPlaceholder,
    message,
    onChangeMessage,
    onAttachmentSelected
}: {
    className: string
    messages: ChatMessage[]
    lastReadAt: Date
    attachments: ChatAttachmentType[]
    inputPlaceholder: string
    message: string,
    onChangeMessage: () => void
    onAttachmentSelected: (files: File[]) => Promise<void> | void
}) {
    const dayjs = useDayjs();

    const ref = useRef<FileInputRef>(null);

    const handleAddAttachment = () => {
        ref.current?.open();
    }

    return (
        <div className={clsx("flex flex-col flex-1", className)}>
            <div className="overflow-y-auto flex-1 flex flex-col-reverse gap-2.5">
                {messages.map((message, index) => <>
                    <ChatMessage
                        {...message}
                        className={clsx("", message.incoming ? "self-start" : "self-end")}
                        showAvatar={index === 0 || messages[index - 1].sender.id !== message.sender.id || !dayjs(messages[index - 1].date).isSame(dayjs(message.date), "date")}
                        showNameAndTimestamp={(messages.length - 1) === index || messages[index + 1].sender.id !== message.sender.id || dayjs(messages[index + 1].date).diff(dayjs(message.date), "minute") > 5}
                    />
                    {dayjs(message.date).isBefore(dayjs(lastReadAt)) && !(dayjs(messages[index + 1].date).isBefore(dayjs(lastReadAt))) && (
                        <ChatNewMessageIndicator count={index + 1} />
                    )}
                    {((messages.length - 1) === index || !dayjs(messages[index + 1].date).isSame(dayjs(message.date), "date")) && (
                        <ChatDateIndicator date={message.date} />
                    )}
                </>)}
            </div>
            <ChatInput
                onAddAttachment={handleAddAttachment}
                onEmojiMenuOpen={() => {}}
                onSend={() => {}}
                onChange={onChangeMessage}
                value={message}
                attachments={attachments}
                placeholder={inputPlaceholder}
            />
            <FileInput ref={ref} onSelected={onAttachmentSelected}/>
        </div>
    )
}