import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { sleep } from "../storybook";
import { Button } from "../utilities";

const meta = {
    component: Button,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: "primary",
        children: "Button",
        onClick: fn(() => sleep(2000))
    }
}

export const Secondary: Story = {
    args: {
        ...Primary.args,
        variant: "secondary"
    }
}

export const Tertiary: Story = {
    args: {
        ...Primary.args,
        variant: "tertiary"
    }
}

export const Ghost: Story = {
    args: {
        ...Primary.args,
        variant: "ghost"
    }
}