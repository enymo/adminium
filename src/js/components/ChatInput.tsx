import clsx from "clsx";
import { FaceSmile, Paperclip, PaperPlane } from "../icons";

function ChatButton({
    className,
    type,
    disabled,
    onClick
}: {
    className?: string
    type: "emoji" | "attachment" | "send"
    disabled?: boolean
    onClick: () => void
}) {
    switch (type) {
        case "emoji":
            return (
                <button
                    className={clsx("rounded-md size-8 flex justify-center items-center bg-bg-100 hover:bg-bg-500 hover:cursor-pointer", className)}
                    onClick={onClick}
                >
                    <FaceSmile className="size-5 fill-neutral-700"/>
                </button>
            )
        case "attachment":
            return (
                <button
                    className={clsx("rounded-md size-8 flex justify-center items-center bg-bg-100 hover:bg-bg-500 hover:cursor-pointer", className)}
                    onClick={onClick}
                >
                    <Paperclip className="size-5 fill-neutral-700"/>
                </button>
            )
        case "send":
            return (
                <button
                    className={clsx("rounded-md size-8 flex justify-center items-center", disabled ? "bg-neutral-400" : "bg-primary-500 hover:bg-primary-600 hover:cursor-pointer", className)}
                    onClick={onClick}
                >
                    <PaperPlane className="size-5 fill-white"/>
                </button>
            )
    }
}

export default function ChatInput({
    onEmojiMenuOpen,
    onAddAttachment,
    onSend
}: {
    onEmojiMenuOpen: () => void
    onAddAttachment: () => void
    onSend: () => void
}) {
    return (
        <div className="relative">
            <textarea
                className={clsx(
                    "resize-none overflow-hidden rounded-xl py-5 px-4",
                    {

                    }
                )}>
            </textarea>
            <div className="absolute bottom-0 flex flex-col w-full">
                <div className="flex flex-row flex-wrap">

                </div>
                <div className="flex flex-row border">
                    <ChatButton type="emoji" onClick={onEmojiMenuOpen}/>
                    <ChatButton type="attachment" onClick={onAddAttachment}/>
                    <ChatButton className="self-end" type="send" onClick={onSend}/>
                </div>
            </div>
        </div>
    )
}