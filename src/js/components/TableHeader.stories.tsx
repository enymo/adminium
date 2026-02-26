import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Filter from "./Filter";
import TableHeader from "./TableHeader";

const meta = {
    component: TableHeader,
    parameters: {
        layout: "fullscreen"
    }
} satisfies Meta<typeof TableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Lorem ipsum",
        filter: (
            <Filter active={0} children={null} />
        ),
        onSearch: fn()
    }
}