import clsx from "clsx"
import { Fragment, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDayjs } from "../providers/DayjsProvider"
import type { ChatAttachmentType } from "./ChatAttachment"
import ChatInput from "./ChatInput"
import ChatMessage from "./ChatMessage"

export interface ChatMessageType {
    id: number
    date: Date
    sender: {
        id: number | string
        name: string
        avatar: string | null
    }
    message: string
    attachments: ChatAttachmentType<string | number>[]
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

export default function Chat<T extends string | number>({
    className,
    messages,
    lastReadAt,
    me,
    attachments,
    inputPlaceholder,
    message,
    onChangeMessage,
    onAttach,
    onRemoveAttachment,
    onSend
}: {
    className: string
    messages: ChatMessageType[]
    lastReadAt: Date | null
    me: string | number,
    attachments: ChatAttachmentType<T>[]
    inputPlaceholder: string
    message: string,
    onChangeMessage: (message: string) => void
    onAttach: (files: File[]) => void
    onRemoveAttachment: (id: T) => void,
    onSend: () => void | Promise<void>
}) {
    const dayjs = useDayjs();

    return (
        <div className={clsx("flex flex-col flex-1", className)}>
            <div className="overflow-y-auto flex-1 flex flex-col items-center">
                <div className="flex grow flex-col-reverse gap-2.5 pb-12 max-w-3xl w-full">
                    {messages.map(({id, date, sender, ...props}, index) => {
                        const incoming = sender.id !== me;
                        const firstMessage = index === messages.length - 1;
                        const differentDay = firstMessage || !dayjs(messages[index + 1]!.date).isSame(date, "day");
                        const showAvatar = index === 0 || messages[index - 1]!.sender.id !== sender.id || dayjs(messages[index - 1]!.date).diff(date, "minutes") > 5;
                        const showHeader = (
                            differentDay
                            || messages[index + 1]!.sender.id !== sender.id
                            || dayjs(date).diff(messages[index + 1]!.date, "minutes") > 5
                        )

                        return (
                            <Fragment key={id}>
                                <ChatMessage
                                    date={date}
                                    sender={sender}
                                    incoming={incoming}
                                    {...props}
                                    className={clsx("", incoming ? "self-start" : "self-end")}
                                    showAvatar={showAvatar}
                                    showNameAndTimestamp={showHeader}
                                />
                                {((firstMessage && lastReadAt === null) || dayjs(date).isAfter(lastReadAt)) && (firstMessage || dayjs(messages[index + 1]!.date).isBefore(lastReadAt)) && (
                                    <ChatNewMessageIndicator count={index + 1} />
                                )}
                                {differentDay && (
                                    <ChatDateIndicator date={date} />
                                )}
                            </Fragment>
                        )
                    })}
                </div>
            </div>
            <div className="px-4 pb-4 flex flex-col items-center">
                <ChatInput
                    className="max-w-3xl w-full"
                    onAttach={onAttach}
                    onRemoveAttachment={onRemoveAttachment}
                    onSend={onSend}
                    onChange={onChangeMessage}
                    value={message}
                    attachments={attachments}
                    placeholder={inputPlaceholder}
                />
            </div>
        </div>
    )
}