import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Breadcrumbs from "./Breadcrumbs";

const meta = {
    component: Breadcrumbs,
    parameters: {
        layout: "centered",
        backgrounds: {
            default: "admin"
        }
    }
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        breadcrumbs: [{
            children: "Lorem ipsum",
            onClick: fn()
        }, {
            children: "Lorem ipsum",
            onClick: fn()
        }, {
            children: "Lorem ipsum",
        }]
    }
}