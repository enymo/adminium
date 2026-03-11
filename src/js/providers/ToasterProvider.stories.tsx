import type { Meta } from "@storybook/react";
import Button from "../components/Button";
import ToasterProvider, { useToaster } from "./ToasterProvider";

const meta: Meta = {
    parameters: {
        layout: "centered"
    },
    decorators: [Story => (
        <ToasterProvider>
            <Story />
        </ToasterProvider>
    )]
};

export default meta;

export const Default = () => {
    const toast = useToaster();

    const handleToast = (variant: "success" | "error") => () => {
        toast({
            title: "Hinweis Titel",
            body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
            variant,
            duration: 5000
        });
    }

    return (
        <div className="flex flex-col gap-3 w-64">
            <Button variant="secondary" onClick={handleToast("success")}>Erfolg</Button>
            <Button variant="secondary" onClick={handleToast("error")}>Fehler</Button>
        </div>
    )
}
