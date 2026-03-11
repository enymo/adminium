import type { Meta, StoryObj } from "@storybook/react-vite";
import AttributeList from "./AttributeList";

const meta = {
    component: AttributeList,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof AttributeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [{
            label: "Kundennummer",
            value: "101001"
        }, {
            label: "Name",
            value: "Max Mustermann"
        }, {
            label: "E-Mail",
            value: "max.mustermann@mail.com"
        }]
    }
}