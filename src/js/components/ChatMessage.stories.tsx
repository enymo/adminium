import type { Meta, StoryObj } from "@storybook/react-vite";
import ChatMessage from "./ChatMessage";

const meta = {
    component: ChatMessage,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        date: new Date("2026-02-01T13:12"),
        message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, accusantium!",
        incoming: false,
        showNameAndTimestamp: true,
        showAvatar: true,
        sender: {
            name: "Max Mustermann",
            avatar: null
            //avatar: "https://picsum.photos/200/200"
        },
        attachments: [{
            id: 0,
            name: "Preisliste gbhhgf2026",
            link: "",
            extension: "pdf",
            type: "pdf",
            size: 24117248,
            preview: "https://picsum.photos/200/300"
        }, {
            id: 1,
            name: "Preisliste gbhhgf2026",
            link: "",
            extension: "pdf",
            type: "pdf",
            size: 24117248,
            preview: "https://picsum.photos/200/300"
        }]
    }
}