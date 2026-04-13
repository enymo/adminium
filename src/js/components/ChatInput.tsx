import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { FaceSmile, Paperclip, PaperPlane } from "../icons";
import AutoSizeTextarea from "./AutoSizeTextarea";
import ChatAttachment, { type ChatAttachmentType } from "./ChatAttachment";
import FileInput, { type FileInputRef } from "./FileInputHandler";
import Loader from "./Loader";

function ChatButton({
    className,
    type,
    disabled,
    onClick,
    loading = false
}: {
    className?: string
    type: "emoji" | "attachment" | "send"
    disabled?: boolean
    onClick: () => void,
    loading?: boolean
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
                    {loading ? (
                        <Loader className="size-5 fill-white" />
                    ) : (
                        <PaperPlane className="size-5 fill-white"/>
                    )}
                </button>
            )
    }
}

export default function ChatInput<T extends string | number>({
    className,
    placeholder,
    attachments,
    value,
    onChange,
    onEmojiMenuOpen,
    onAttach,
    onRemoveAttachment,
    onSend
}: {
    className?: string
    placeholder?: string
    attachments: ChatAttachmentType<T>[]
    value: string
    onChange: (message: string) => void
    onEmojiMenuOpen?: () => void
    onAttach: (files: File[]) => void
    onRemoveAttachment: (id: T) => void,
    onSend: () => void | Promise<void>
}) {
    const [height, setHeight] = useState(0);
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (attachments.length === 0 && value === "") return;
        setSending(true);
        try {
            await onSend();
        }
        finally {
            setSending(false);
        }
    }

    const ref = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<FileInputRef>(null);

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
                onChange={e => onChange(e.target.value)}
                value={value}
            />
            <div ref={ref} className="absolute bottom-0 flex flex-col gap-2 w-full px-4 pb-4 pointer-events-none">
                <div className="flex flex-row flex-wrap gap-2.5">
                    {attachments?.map(({id, ...props}) => (
                        <ChatAttachment
                            key={id}
                            onRemove={() => onRemoveAttachment(id)}
                            {...props}
                            className="pointer-events-auto"
                        />
                    ))}
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        {onEmojiMenuOpen && (
                            <ChatButton className="pointer-events-auto" type="emoji" onClick={onEmojiMenuOpen} />
                        )}
                        <ChatButton className="pointer-events-auto" type="attachment" onClick={() => fileInputRef.current?.open()} />
                    </div>
                    <ChatButton loading={sending} className="pointer-events-auto" type="send" onClick={handleSend}/>
                </div>
            </div>
            <FileInput ref={fileInputRef} onSelected={onAttach} />
        </div>
    )
}