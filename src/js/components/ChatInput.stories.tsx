import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import ChatInput from "./ChatInput";

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
        value: "",
        onChange: fn(),
        onAttach: fn(),
        onRemoveAttachment: fn(),
        onSend: fn(),
        className: "w-200",
        placeholder: "Lorem ipsum dolor sit...",
        attachments: [{
            id: 0,
            name: "Preisliste gbhhgf2026",
            mimeType: "application/pdf",
            size: 24117248,
            preview: "https://picsum.photos/200/300",
            link: "",
            uploading: true
        }, {
            id: 1,
            name: "Preisliste gbhhgf2026",
            mimeType: "image/png",
            size: 24117248,
            preview: "https://picsum.photos/200/300",
            link: ""
        }, {
            id: 2,
            name: "Preisliste gbhhgf2026",
            mimeType: "image/png",
            size: 24117248,
            preview: "https://picsum.photos/200/300",
            link: ""
        }, {
            id: 3,
            name: "Preisliste gbhhgf2026",
            mimeType: "image/png",
            size: 24117248,
            preview: "https://picsum.photos/200/300",
            link: ""
        }]
    }   
}