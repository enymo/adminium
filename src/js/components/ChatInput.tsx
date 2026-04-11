import clsx from "clsx";
import { FaceSmile, Paperclip, PaperPlane } from "../icons";
import ChatAttachment, { type ChatAttachmentType } from "./ChatAttachment";
import { useEffect, useRef, useState } from "react";
import AutoSizeTextarea from "./AutoSizeTextarea";

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
    className,
    placeholder,
    attachments,
    value,
    onChange,
    onEmojiMenuOpen,
    onAddAttachment,
    onSend
}: {
    className?: string
    placeholder?: string
    attachments?: ChatAttachmentType[]
    value: string
    onChange: () => void
    onEmojiMenuOpen: () => void
    onAddAttachment: () => void
    onSend: () => void
}) {
    const [height, setHeight] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const target = ref.current;
        if (target !== null) {
            const observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.target === target) {
                        setHeight(entry.contentRect.height);
                        break;
                    }
                }
            })

            observer.observe(target);

            return () => observer.disconnect();
        }
    }, [ref, setHeight])

    return (
        <div className={clsx("relative flex flex-col shadow-chat", className)}>
            <AutoSizeTextarea
                className={clsx("appearance-none outline-none resize-none overflow-hidden rounded-xl py-5 px-4 bg-bg-100 border border-neutral-300 text-lg placeholder:text-text-200 hover:border-neutral-400 focus:hover:border-primary-500 focus:border-primary-500")}
                placeholder={placeholder}
                padding={24}
                style={{paddingBottom: height + 24}}
                onChange={onChange}
                value={value}
            />
            <div ref={ref} className="absolute bottom-0 flex flex-col gap-2 w-full px-4 pb-4 pointer-events-none">
                <div className="flex flex-row flex-wrap gap-2.5">
                    {attachments?.map((props) => (
                        <ChatAttachment
                            {...props}
                            className="pointer-events-auto"
                        />
                    ))}
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        <ChatButton className="pointer-events-auto" type="emoji" onClick={onEmojiMenuOpen}/>
                        <ChatButton className="pointer-events-auto" type="attachment" onClick={onAddAttachment}/>
                    </div>
                    <ChatButton className="pointer-events-auto" type="send" onClick={onSend}/>
                </div>
            </div>
        </div>
    )
}