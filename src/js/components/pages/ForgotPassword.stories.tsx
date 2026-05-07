import { type Meta, type StoryObj } from "@storybook/react-vite";
import { withFlexLayout, withMemoryRouter } from "../../storybook";
import { sleep } from "../../utilities";
import { ForgotPassword } from "./ForgotPassword";

const meta = {
    component: ForgotPassword,
    parameters: {
        layout: "fullscreen"
    },
    decorators: [withMemoryRouter(), withFlexLayout]
} satisfies Meta<typeof ForgotPassword>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSubmit: () => sleep(2000),
        toLogin: "/"
    }
}