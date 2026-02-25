import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import FilterDropdown from "./FilterDropdown";

const meta = {
    component: FilterDropdown,
    parameters: {
        layout: "centered"
    },
    args: {
        className: "w-[220px]"
    },
    render(args) {
        const [{ value }, updateArgs] = useArgs();

        return (
            <FilterDropdown {...args} value={value} onChange={value => updateArgs({ value })} />
        )
    }
} satisfies Meta<typeof FilterDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: [],
        groups: [{
            key: "lng_active",
            label: "Sprache vorgesehen",
            items: [{
                label: "Französisch",
                value: "fr_active"
            }, {
                label: "Italienisch",
                value: "it_active"
            }]
        }, {
            key: "lng_exists",
            label: "Sprache vorhanden",
            items: [{
                label: "Französisch",
                value: "fr_exists"
            }, {
                label: "Italienisch",
                value: "it_exists"
            }]
        }]
    }
}