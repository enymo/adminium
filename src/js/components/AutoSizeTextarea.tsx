import { useCallback, useEffect, useRef, type ChangeEventHandler, type InputHTMLAttributes } from "react";

export default function AutoSizeTextarea({
    value,
    onChange,
    padding,
    ...props
}: InputHTMLAttributes<HTMLTextAreaElement> & {
    padding: number
}) {
    const ref = useRef<HTMLTextAreaElement>(null);

    const handleResize = useCallback(() => {
        const target = ref.current;
        if (target !== null) {
            target.style.height = "0";
            console.log(target.scrollHeight);
            target.style.height = target.scrollHeight + padding + "px";
        }
    }, [ref, padding])

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        handleResize();
        onChange?.(e);
    }

    useEffect(handleResize, [handleResize, value, props.style?.paddingBottom]);

    return (
        <textarea
            ref={ref}
            value={value}
            onChange={handleChange}
            {...props}
        />
    )
}