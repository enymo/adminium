import type { Meta, StoryObj } from "@storybook/react-vite";
import EmailInput from "./EmailInput";

const meta = {
    component: EmailInput,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof EmailInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
    }
}