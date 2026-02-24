import type { Meta, StoryObj } from "@storybook/react-vite";
import Loader from "./Loader";

const meta = {
    component: Loader,
    parameters: {
        layout: "centered",
    }
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: "w-10"
    }
}