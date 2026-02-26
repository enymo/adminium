import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import Pagination from "./Pagination";

const meta = {
    component: Pagination,
    render(args) {
        const [page, setPage] = useState(args.page);

        return <Pagination {...args} page={page} onChangePage={setPage} />
    }
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        itemsPerPage: 50,
        totalItems: 250,
        page: 1,
        onChangePage: fn()
    }
}