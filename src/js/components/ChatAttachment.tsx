import clsx from "clsx"
import { Download, Paperclip, Pdf, XMark } from "../icons"
import { formatFileSize } from "../utilities"

export interface ChatAttachmentType {
    id: number | string
    name: string
    extension: string
    type: "pdf" | "image" | "other"
    size: number
    preview?: string
    link: string
} 

interface ChatAttachmentProps extends Omit<ChatAttachmentType, "id"> {
    className?: string
    sent?: boolean
    onRemove?: () => void
}

export default function ChatAttachment({
    className,
    name,
    extension,
    type,
    size,
    preview,
    sent = false,
    link,
    onRemove,
}: ChatAttachmentProps) {
    return (
        <div className={clsx("relative rounded-lg bg-bg-200 border border-neutral-200 shadow-attachment w-50 h-14.5 py-2 pl-2 pr-3 flex flex-row gap-2.5", className)}>
            {(() => {
                switch (type) {
                    case "other":
                        return (
                            <div className="rounded-sm bg-primary-100 flex justify-center items-center w-11.5">
                                <Paperclip className="fill-primary-600 size-6" />
                            </div>
                        )
                    case "pdf":
                        return (
                            <div className="rounded-sm bg-bg-600 flex justify-center items-center w-11.5">
                                <Pdf className="size-6" />
                            </div>
                        )
                    case "image":
                        return (
                            <img className="object-cover rounded-sm w-11.5" src={preview} alt="" />
                        )
                }
            })()}
            <div className="flex flex-row flex-1">
                <div className="flex flex-col flex-1 justify-center">
                    <div className="body-xs-md text-text-800 line-clamp-1">{name}</div>
                    <div className="flex flex-row gap-1.5 text-2xs text-text-500">
                        <div className="uppercase">{extension}</div>
                        <div>{formatFileSize(size)}</div>
                    </div>
                </div>
                {sent && (
                    <a className="fill-neutral-500 size-5 self-center hover:cursor-pointer" href={link}>
                        <Download />
                    </a>
                )}
            </div>
            {!sent && (
                <button onClick={onRemove} className="absolute fill-neutral-500 size-3 self-center top-2 right-2 flex-1 hover:cursor-pointer">
                    <XMark />
                </button>
            )}
        </div>  
    )
}