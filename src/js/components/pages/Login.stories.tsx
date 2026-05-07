import { type Meta, type StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { withFlexLayout, withMemoryRouter } from "../../storybook";
import { Login } from "./Login";

const meta = {
    component: Login,
    parameters: {
        layout: "fullscreen"
    },
    decorators: [withMemoryRouter(), withFlexLayout]
} satisfies Meta<typeof Login>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSubmit: fn(),
        toForgotPassword: "/"
    }
}
