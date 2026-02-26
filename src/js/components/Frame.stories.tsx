import type { Meta, StoryObj } from "@storybook/react-vite";
import Gauge from "../../svg/gauge-solid-full.svg?react";
import Logo from "../../svg/logo.svg?react";

import { withMemoryRouter } from "../storybook";
import Frame from "./Frame";

const meta = {
    component: Frame,
    parameters: {
        layout: "fullscreen",
    }, 
    decorators: [withMemoryRouter()]
} satisfies Meta<typeof Frame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: "h-svh",
        logo: (
            <div className="px-4 pt-4 pb-10">
                <Logo />
            </div>
        ),
        user: "Jane Doe",
        children: null,
        items: [{
            to: "/one",
            icon: Gauge,
            children: "One"
        }, {
            to: "/two",
            icon: Gauge,
            children: "Two"
        }, {
            to: "/three",
            icon: Gauge,
            children: "Three"
        }]
    }
}