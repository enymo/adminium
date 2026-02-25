import type { Meta, StoryObj } from "@storybook/react-vite";
import FileInput from "./FileInput";

const meta = {
    component: FileInput,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Datei hochladen:",
        error: "",
        filename: "Dateiname"
    }
}