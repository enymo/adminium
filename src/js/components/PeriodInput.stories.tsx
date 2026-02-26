import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from "dayjs";
import { useState } from "react";
import { fn } from "storybook/test";
import PeriodInput from "./PeriodInput";

const meta = {
    component: PeriodInput,
    parameters: {
        layout: "centered"
    },
    render(args) {
        const [from, setFrom] = useState(args.from);
        const [to, setTo] = useState(args.to);

        return <PeriodInput {...args} from={from} onChangeFrom={setFrom} to={to} onChangeTo={setTo} />
    }
} satisfies Meta<typeof PeriodInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        from: dayjs().format("YYYY-MM-DD"),
        to: dayjs().format("YYYY-MM-DD"),
        onChangeFrom: fn(),
        onChangeTo: fn()
    }
}