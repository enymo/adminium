import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import ImageInput from "./ImageInput";

const meta = {
    component: ImageInput,
    parameters: {
        layout: "centered"
    },
    render(args) {
        const [file, setFile] = useState<File>();

        return <ImageInput {...args} value={file} onChange={setFile} />
    }
} satisfies Meta<typeof ImageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
    args: {
        imageClassName: "h-[112px] w-auto max-w-none aspect-card object-cover"
    }
}

export const Avatar: Story = {
    args: {
        imageClassName: "size-[112px] rounded-full object-cover"
    }
}