import { Paperclip } from "../icons"

export default function ChatAttachment({
    fileName,
    fileExtension,
    fileSize,
    filePreview,
    sent = false,
    onRemove
}: {
    fileName: string
    fileExtension?: string
    fileSize: string
    filePreview: string
    sent: boolean
    onRemove: (id: string) => void
}) {
    return (
        <div className="rounded-lg bg-bg-200 border border-neutral-200 shadow-attachment w-50 h-14.5 p-2 flex flex-col gap-2.5">
            <div className="rounded-sm bg-primary-100 flex justify-center items-center w-12.5">
                <Paperclip className="fill-primary-600 size-11" />
            </div>
            <div>
                <div>{fileName}</div>
                <div className="flex flex-row gap-1.5 text-text-500 body-s">
                    <div className="capitalize">{fileExtension}</div>
                    <div>{fileSize}</div>
                </div>
            </div>
        </div>  
    )
}