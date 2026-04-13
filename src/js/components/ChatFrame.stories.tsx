import type { Meta, StoryObj } from "@storybook/react-vite";
import ChatFrame from "./ChatFrame";

const meta = {
    component: ChatFrame,
    parameters: {
        layout: "fullscreen"
    }
} satisfies Meta<typeof ChatFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        chats: [{
            name: "Max Mustermann",
            unreadCount: 2,
            lastMessage: {
                date: new Date("1970-01-02T13:00"),
                sender: "Max Mustermann",
                message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, tempore?"
            }
        }]
    }   
}