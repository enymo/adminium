import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "./Badge";

const meta = {
    component: Badge,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        variant: "success",
        children: "Lorem Ipsum"
    }
}

export const Neutral: Story = {
    args: {
        variant: "neutral",
        children: "Lorem Ipsum"
    }
}

export const Primary: Story = {
    args: {
        variant: "primary",
        children: "Lorem Ipsum"
    }
}

export const Warning: Story = {
    args: {
        variant: "warning",
        children: "Lorem Ipsum"
    }
}

export const Error: Story = {
    args: {
        variant: "error",
        children: "Lorem Ipsum"
    }
}