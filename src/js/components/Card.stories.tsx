import type { Meta, StoryObj } from "@storybook/react-vite";
import Card from "./Card";

const meta = {
    component: Card,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Up: Story = {
    args: {
        value: 110,
        previous: 100,
        period: "month",
        title: "Testmetrik"
    }
}

export const Down: Story = {
    args: {
        value: 80,
        previous: 100,
        period: "other",
        title: "Testmetrik"
    }
}