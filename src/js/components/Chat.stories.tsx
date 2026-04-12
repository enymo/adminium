import type { Meta, StoryObj } from "@storybook/react-vite";
import Chat from "./Chat";

const meta = {
    component: Chat,
    parameters: {
        layout: "padded"
    }
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: "max-w-200 self-center",
        lastReadAt: new Date("1970-01-02T12:00"),
        messages: [{
            id: 0,
            date: new Date("1970-01-02T13:00"),
            sender: {
                id: 0,
                name: "Max Mustermann",
                avatar: "https://picsum.photos/200/200"
            },
            attachments: [{
                id: 0,
                name: "Preisliste 2026",
                extension: "png",
                link: "",
                size: 24117248,
                type: "image",
                preview: "https://picsum.photos/200/200"
            }],
            incoming: false,
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quod asperiores laudantium quidem repellat reprehenderit maiores obcaecati animi illum culpa!"
        }, {
            id: 1,
            date: new Date("1970-01-02T12:59:00"),
            sender: {
                id: 0,
                name: "Max Mustermann",
                avatar: "https://picsum.photos/200/200"
            },
            attachments: [],
            incoming: false,
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quod asperiores laudantium quidem repellat reprehenderit maiores obcaecati animi illum culpa!"
        }, {
            id: 2,
            date: new Date("1970-01-02T12:50:00"),
            sender: {
                id: 0,
                name: "Max Mustermann",
                avatar: "https://picsum.photos/200/200"
            },
            attachments: [],
            incoming: false,
            message: "Lorem ipsum dolor sit amet."
        }, {
            id: 3,
            date: new Date("1970-01-01T12:00:00"),
            sender: {
                id: 1,
                name: "Max Mustermann",
                avatar: "https://picsum.photos/200/200"
            },
            attachments: [{
                id: 0,
                name: "Preisliste 2026",
                extension: "png",
                link: "",
                size: 24117248,
                type: "image",
                preview: "https://picsum.photos/200/200"
            }],
            incoming: true,
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quod asperiores laudantium quidem repellat reprehenderit maiores obcaecati animi illum culpa!"
        }, {
            id: 4,
            date: new Date("1970-01-01T11:00:00"),
            sender: {
                id: 1,
                name: "Max Mustermann",
                avatar: "https://picsum.photos/200/200"
            },
            attachments: [],
            incoming: true,
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quod asperiores laudantium quidem repellat reprehenderit maiores obcaecati animi illum culpa!"
        }]
    }   
}