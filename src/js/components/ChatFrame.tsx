import { useDayjs } from "../providers/DayjsProvider"
import type { ChatMessage } from "./Chat"
import type { ChatAttachmentType } from "./ChatAttachment"
import ChatPreview from "./ChatPreview"

export default function ChatFrame({
    chat,
    chats
}: {
    chat: {
        messages: ChatMessage[]
        lastReadAt: Date
        attachments: ChatAttachmentType[]
        inputPlaceholder: string
        message: string,
        onChangeMessage: () => void
        onAttachmentSelected: (files: File[]) => Promise<void> | void
    }
    chats: {
        name: string,
        lastMessage: {
            date: Date,
            sender: string,
            message: string
        },
        unreadCount: number
    }[]
}) {
    const dayjs = useDayjs();

    return (
        <div className="flex flex-row">
            <div className="max-w-75 flex flex-col bg-bg-100 border-r border-r-neutral-200">
                {chats.map(({name, lastMessage, unreadCount}) => (
                    <ChatPreview
                        title={name}
                        badgeCount={unreadCount}
                        time={}
                    />
                ))}
            </div>
        </div>
    )
}