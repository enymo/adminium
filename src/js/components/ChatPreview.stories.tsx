import type { Meta, StoryObj } from "@storybook/react-vite";
import ChatPreview from "./ChatPreview";

const meta = {
    component: ChatPreview,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof ChatPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Mustermann Gmbh",
        badgeCount: 1,
        time: "11:26",
        body: "Max Mustermann: Hallo, ich habe eine Frage zu meiner Bestellung mit der Bestellnummer: 12345.",
        className: "w-75",
        active: false
    }   
}