import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import ChatAttachment from "./ChatAttachment";

const meta = {
    component: ChatAttachment,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof ChatAttachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: "Preisliste gbhhgf2026",
        extension: "pdf",
        type: "pdf",
        size: 24117248,
        preview: "https://picsum.photos/200/300",
        sent: false,
        onRemove: fn(),
        onDownload: fn()
    }   
}