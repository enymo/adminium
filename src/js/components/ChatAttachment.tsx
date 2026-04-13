import clsx from "clsx";
import mime from "mime-types";
import { Download, Paperclip, Pdf, XMark } from "../icons";
import { formatFileSize } from "../utilities";
import Loader from "./Loader";

export interface ChatAttachmentType<T extends string | number> {
    id: T
    name: string
    mimeType: string
    size: number
    preview?: string
    uploading?: boolean
    link: string
} 

interface ChatAttachmentProps<T extends string | number> extends Omit<ChatAttachmentType<T>, "id"> {
    className?: string
    sent?: boolean
    onRemove?: () => void
}

export default function ChatAttachment<T extends string | number>({
    className,
    name,
    mimeType,
    size,
    preview,
    uploading = false,
    sent = false,
    link,
    onRemove,
}: ChatAttachmentProps<T>) {
    return (
        <div className={clsx("relative rounded-lg bg-bg-200 border border-neutral-200 shadow-attachment w-50 h-14.5 py-2 pl-2 pr-3 flex flex-row gap-2.5", className)}>
            <div className="relative flex">
                {preview ? (
                    <img className="object-cover rounded-sm w-11.5" src={preview} alt="" />
                ) : mimeType === "application/pdf" ? (
                    <div className="rounded-sm bg-bg-600 flex justify-center items-center w-11.5">
                        <Pdf className="size-6" />
                    </div>
                ) : (
                    <div className="rounded-sm bg-primary-100 flex justify-center items-center w-11.5">
                        <Paperclip className="fill-primary-600 size-6" />
                    </div>
                )}
                {uploading && (
                    <div className="absolute inset-0 flex justify-center items-center rounded-sm bg-white/80">
                        <Loader className="fill-primary-500 size-6" />
                    </div>
                )}
            </div>
            <div className="flex flex-row flex-1">
                <div className="flex flex-col flex-1 justify-center">
                    <div className="body-xs-md text-text-800 line-clamp-1">{name}</div>
                    <div className="flex flex-row gap-1.5 text-2xs text-text-500">
                        <div className="uppercase">{mime.extension(mimeType)}</div>
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