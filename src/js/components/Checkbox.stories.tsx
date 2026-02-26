import { Checkbox } from "@enymo/bcc";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
    component: Checkbox,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        checked: false,
        disabled: false,
        error: false
    }
}

export const Checked: Story = {
    args: {
        checked: true,
        disabled: false,
        error: false
    }
}

export const Disabled: Story = {
    args: {
        checked: false,
        disabled: true
    }
}

export const DisabledChecked: Story = {
    args: {
        checked: true,
        disabled: true,
        error: false
    }
}

export const Error: Story = {
    args: {
        checked: false,
        disabled: false,
        error: true
    }
}

export const CheckedError: Story = {
    args: {
        checked: true,
        disabled: false,
        error: true
    }
}

export const DisabledError: Story = {
    args: {
        checked: false,
        disabled: true,
        error: true
    }
}

export const CheckedDisabledError: Story = {
    args: {
        checked: true,
        disabled: true,
        error: true
    }
}