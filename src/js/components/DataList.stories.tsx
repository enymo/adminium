import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataList } from "./DataList";

const meta = {
    component: DataList,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [[{
            key: 1,
            label: "Lorem ipsum",
            value: "Lorem ipsum"
        }, {
            key: 2,
            label: "Lorem ipsum",
            value: "Lorem ipsum"
        }, {
            key: 3,
            label: "Lorem ipsum",
            value: "Lorem ipsum"
        }], [{
            key: 4,
            label: "Lorem ipsum",
            value: "Lorem ipsum"
        }, {
            key: 5,
            label: "Lorem ipsum",
            value: "Lorem ipsum"
        }], [{
            key: 6,
            label: "Lorem ipsum",
            value: "Lorem ipsum"
        }]]
    }
}