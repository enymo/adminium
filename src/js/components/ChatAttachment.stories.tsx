import type { Meta, StoryObj } from "@storybook/react-vite";
import ChatAttachment from "./ChatAttachment";
import { fn } from "storybook/test";

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
        fileName: "Preisliste 2026",
        fileExtension: "pdf",
        fileSize: "25MB",
        filePreview: "",
        sent: false,
        onRemove: fn()
    }   
}