import { createRequiredContext } from "@enymo/react-better-context";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition, Transition, TransitionGroup } from "react-transition-group";
import type { TransitionProps } from "react-transition-group/Transition";
import useClientSize from "../hooks/ClientSizeHook";
import { ToastSuccess, ToastWarning } from "../icons";

export interface ToastOptions {
    title: ReactNode,
    body: ReactNode,
    variant: "success" | "error",
    duration: number
}

interface ToastProps extends ToastOptions, Omit<TransitionProps, "timeout" | "nodeRef"> {
    onDone: () => void
}

interface ToastState extends ToastOptions {
    id: number
}

const [Provider, useToaster] = createRequiredContext<(options: ToastOptions) => void>("ToasterProvider must be present in component tree");

function Toast({
    title,
    body,
    variant,
    duration,
    onDone,
    ...props
}: ToastProps) {
    const innerRef = useRef<HTMLDivElement>(null);
    const [ref, {height}] = useClientSize<HTMLDivElement>();
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setShow(false), duration);
        return () => clearTimeout(timeout);
    }, [setShow, duration]);

    return (
        <Transition {...props} timeout={500} nodeRef={ref}>
            {state => (
                <div ref={ref} className="transition-[height,padding-top] duration-500" style={state === "exiting" ? {
                    height: "0",
                    paddingTop: "0"
                } : {
                    height,
                    paddingTop: "12px"
                }}>
                    <CSSTransition
                        nodeRef={innerRef}
                        classNames={{
                            appear: "opacity-0",
                            appearActive: "opacity-100! transition-opacity duration-700",
                            appearDone: "opacity-100",
                            exit: "opacity-100",
                            exitActive: "opacity-0! transition-opacity duration-700",
                            exitDone: "opacity-0"
                        }}
                        in={show}
                        timeout={700}
                        onExited={onDone}
                        unmountOnExit
                        appear
                    >
                        <div ref={innerRef} className="px-3 py-2 shadow-toast rounded-xl bg-bg-100 border border-neutral-100 flex items-start gap-2.5 max-w-sm">
                            {variant === "success" ? (
                                <ToastSuccess className="mt-1 size-5 fill-success-500" />
                            ) : (
                                <ToastWarning className="mt-1 size-5 fill-danger-500" />
                            )}
                            <div className="flex-1 flex flex-col gap-0.5">
                                <span className="body-s-md">{title}</span>
                                <span className="body-s text-text-500">{body}</span>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            )}
        </Transition>
    )
}

export { useToaster };
export default function ToasterProvider({children}: {
    children: ReactNode
}) {
    const [toasts, setToasts] = useState<ToastState[]>([]);
    const toast = useCallback((options: ToastOptions) => {
        setToasts(toasts => [...toasts, {
            id: Math.max(0, ...toasts.map(({id}) => id)) + 1,
            ...options
        }])
    }, [setToasts]);

    return <>
        <Provider value={toast}>
            {children}
        </Provider>
        <TransitionGroup className="fixed z-50 left-1/2 -translate-x-1/2 bottom-16 flex flex-col-reverse">
            {toasts.map(({id, ...props}) => (
                <Toast
                    key={id}
                    onDone={() => setToasts(toasts => toasts.filter(toast => toast.id !== id))}
                    {...props}
                />
            ))}
        </TransitionGroup>
    </>
}