import type { Meta, StoryObj } from "@storybook/react-vite";
import ChatInput from "./ChatInput";
import { fn } from "storybook/test";

const meta = {
    component: ChatInput,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: "w-200",
        placeholder: "Lorem ipsum dolor sit...",
        attachments: [{
            id: 0,
            name: "Preisliste gbhhgf2026",
            extension: "pdf",
            type: "pdf",
            size: 24117248,
            preview: "https://picsum.photos/200/300",
            onRemove: fn(),
        }, {
            id: 1,
            name: "Preisliste gbhhgf2026",
            extension: "png",
            type: "image",
            size: 24117248,
            preview: "https://picsum.photos/200/300",
            onRemove: fn(),
        }, {
            id: 2,
            name: "Preisliste gbhhgf2026",
            extension: "png",
            type: "image",
            size: 24117248,
            preview: "https://picsum.photos/200/300",
            onRemove: fn(),
        }, {
            id: 3,
            name: "Preisliste gbhhgf2026",
            extension: "png",
            type: "image",
            size: 24117248,
            preview: "https://picsum.photos/200/300",
            onRemove: fn(),
        }]
    }   
}