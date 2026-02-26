import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import SelectMultiple from "./SelectMultiple";

const meta = {
    component: SelectMultiple,
    parameters: {
        layout: "centered"
    },
    args: {
        className: "w-[240px]",
        value: [],
        onChange: fn()
    },
    render(args) {
        const [value, setValue] = useState(args.value);

        return <SelectMultiple {...args} value={value} onChange={setValue} />
    }
} satisfies Meta<typeof SelectMultiple>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Label",
        placeholder: "-- Bitte auswählen --",
        choices: [{
            label: "Eine Option",
            value: "a"
        }, {
            label: "Noch eine Option",
            value: "b"
        }, {
            label: "Andere Option",
            value: "c"
        }, {
            label: "Ganz andere Option",
            value: "d"
        }, {
            label: "Gute Option",
            value: "e"
        }, {
            label: "Schlechte Option",
            value: "f"
        }, {
            label: "Keine Ahnung Option",
            value: "g"
        }],
        showMultiple: 1
    }
}

export const ShowTags: Story = {
    args: {
        className: "w-[500px]",
        label: "Label",
        placeholder: "-- Bitte auswählen --",
        choices: [{
            label: "Eine Option",
            value: "a"
        }, {
            label: "Noch eine Option",
            value: "b"
        }, {
            label: "Andere Option",
            value: "c"
        }, {
            label: "Ganz andere Option",
            value: "d"
        }, {
            label: "Gute Option",
            value: "e"
        }, {
            label: "Schlechte Option",
            value: "f"
        }, {
            label: "Keine Ahnung Option",
            value: "g"
        }],
        showTags: true
    }
}