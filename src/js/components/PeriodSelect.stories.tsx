import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import PeriodSelect from "./PeriodSelect";

const meta = {
    component: PeriodSelect,
    parameters: {
        layout: "centered"
    },
    render(args) {
        const [value, setValue] = useState(args.value);

        return <PeriodSelect {...args} value={value} onChange={setValue} />
    }
} satisfies Meta<typeof PeriodSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        choices: [{
            label: "Dieses Jahr",
            value: "thisYear"
        }, {
            label: "Letzter Monat",
            value: "lastMonth"
        }, {
            label: "Dieser Monat",
            value: "thisMonth"
        }, {
            label: "Letzte Woche",
            value: "lastWeek"
        }, {
            label: "Diese Woche",
            value: "thisWeek"
        }, {
            label: "Gestern",
            value: "yesterday"
        }, {
            label: "Heute",
            value: "today"
        }],
        value: "lastMonth",
        onChange: fn()
    }
}