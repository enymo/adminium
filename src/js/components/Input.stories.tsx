import { Input } from "@enymo/bcc";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MagnifyingGlassIcon from "../../svg/magnifying-glass-solid-full.svg?react";

const meta = {
    component: Input,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: "w-[220px]",
        label: "Label",
        hint: "Hint text",
        tooltip: "Example tooltip",
        placeholder: "Lorem Ipsum"
    }
}

export const Error: Story = {
    args: {
        ...Default.args,
        error: "Error message"
    }
}

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true
    }
}

export const Textarea: Story = {
    args: {
        ...Default.args,
        type: "textarea"
    }
}

export const Select: Story = {
    args: {
        ...Default.args,
        type: "select",
        choices: [{
            label: "Choice A Very very long name",
            value: "choice_a"
        }, {
            label: "Choice B",
            value: "choice_b"
        }]
    }
}

export const Search: Story = {
    args: {
        ...Default.args,
        prefixIcon: MagnifyingGlassIcon
    }
}