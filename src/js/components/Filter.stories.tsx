import { Input } from "@enymo/bcc";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";
import Filter from "./Filter";

const meta = {
    component: Filter,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        active: 0,
        children: null
    },
    render() {
        const [active, setActive] = useState<"" | "active" | "inactive" | "cancelled" | "downgrade">("");
        const [role, setRole] = useState<"" | "admin" | "permanentAccess" | "user">("");
        const activeCount = useMemo(() => [active, role].reduce((prev, cur) => cur ? prev + 1 : prev, 0), [active, role]);

        return (
            <Filter active={activeCount}>
                <Input type="select" value={active} onChange={setActive as any} label="Status" choices={[{
                    value: "",
                    label: "Alle"
                }, {
                    value: "active",
                    label: "Aktiv"
                }, {
                    value: "inactive",
                    label: "Inaktiv"
                }, {
                    value: "cancelled",
                    label: "Gekündigt"
                }, {
                    value: "downgrade",
                    label: "Downgrade geplant"
                }]} />
                <Input type="select" value={role} onChange={setRole as any} label="Rolle" choices={[{
                    value: "",
                    label: "Alle"
                }, {
                    value: "admin",
                    label: "Admin"
                }, {
                    value: "permanentAccess",
                    label: "Permanenter Zugriff"
                }, {
                    value: "user",
                    label: "Benutzer"
                }]} />
            </Filter>
        )
    }
}