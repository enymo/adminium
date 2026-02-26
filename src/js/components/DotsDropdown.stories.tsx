import type { Meta, StoryObj } from "@storybook/react-vite";
import { withMemoryRouter } from "../storybook";
import DotsDropdown from "./DotsDropdown";

const meta = {
    component: DotsDropdown,
    parameters: {
        layout: "centered",
        backgrounds: {
            default: "admin"
        }
    },
    decorators: [withMemoryRouter()]
} satisfies Meta<typeof DotsDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [{
            children: "Frage bearbeiten"
        }, {
            children: "Deaktivieren"
        }, {
            variant: "danger",
            children: "Löschen"
        }]
    }
}