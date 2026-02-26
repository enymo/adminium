import { useCallback, useImperativeHandle, useRef, type ChangeEventHandler, type Ref } from "react";
export interface FileInputRef {
    open: () => void
}

export interface FileInputProps {
    multiple?: boolean,
    accept?: string,
    onSelected: (files: File[]) => void,
    ref: Ref<FileInputRef>
}

export default function FileInput({
    onSelected,
    ref,
    ...props
}: FileInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        open: () => inputRef.current?.click()
    }), [inputRef]);

    const handleSelected = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
        if (e.target.files !== null) {
            onSelected([...e.target.files]);
        }
        e.target.value = "";
    }, [onSelected]);

    return (
        <input
            ref={inputRef}
            className="hidden"
            type="file"
            onChange={handleSelected}
            {...props}
        />
    )
}