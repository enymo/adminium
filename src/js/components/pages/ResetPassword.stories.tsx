import { type Meta, type StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { withFlexLayout } from "../../storybook";
import { ResetPassword } from "./ResetPassword";

const meta = {
    component: ResetPassword,
    parameters: {
        layout: "fullscreen"
    },
    decorators: [withFlexLayout]
} satisfies Meta<typeof ResetPassword>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSubmit: fn(),
    }
}