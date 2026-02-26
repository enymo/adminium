import compare from "@enymo/comparison";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { simpleDndSorting } from "../utilities";
import Table from "./Table";

const meta = {
    component: Table,
    parameters: {
        layout: "centered",
    }
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        head: [{
            label: "Column A"
        }, {
            label: "Column B"
        }, {
            label: "Column C"
        }],
        rows: [{
            id: 1,
            data: [{
                children: "Row 1 data for Column A"
            }, {
                children: "Row 1 data for Column B"
            }, {
                children: "Row 1 data for Column C"
            }]
        }, {
            id: 2,
            data: [{
                children: "Row 2 data for Column A"
            }, {
                children: "Row 2 data for Column B"
            }, {
                children: "Row 2 data for Column C"
            }]
        }, {
            id: 3,
            data: [{
                children: "Row 3 data for Column A"
            }, {
                children: "Row 3 data for Column B"
            }, {
                children: "Row 3 data for Column C"
            }]
        }]
    }
}

export const Sortable: Story = {
    args: {
        head: [{
            label: "ID",
            name: "id"
        }, {
            label: "Text",
            name: "text"
        }],
        rows: [{
            id: 1,
            data: [{
                children: 1
            }, {
                children: "The quick brown fox jumps over the lazy dog"
            }]
        }, {
            id: 2,
            data: [{
                children: 2
            }, {
                children: "Brown foxes are quick"
            }]
        }, {
            id: 3,
            data: [{
                children: 3
            }, {
                children: "Dogs are lazy"
            }]
        }],
        sortBy: {
            direction: "asc",
            column: "id"
        }
    },
    render: ({ rows, ...args }) => {
        const [sortBy, setSortBy] = useState(args.sortBy);
        const sortIndex = args.head.findIndex(({ name }) => name === sortBy!.column);

        return <Table
            {...args}
            rows={[...rows].sort((a, b) => compare(a.data[sortIndex]!.children, b.data[sortIndex]!.children) * (sortBy!.direction === "asc" ? 1 : -1))}
            sortBy={sortBy}
            onChangeSortBy={setSortBy}
        />
    }
}

export const Draggable: Story = {
    args: {
        head: [{
            label: "Column A"
        }, {
            label: "Column B"
        }, {
            label: "Column C"
        }],
        rows: [{
            id: 1,
            data: [{
                children: "Row 1 data for Column A"
            }, {
                children: "Row 1 data for Column B"
            }, {
                children: "Row 1 data for Column C"
            }]
        }, {
            id: 2,
            data: [{
                children: "Row 2 data for Column A"
            }, {
                children: "Row 2 data for Column B"
            }, {
                children: "Row 2 data for Column C"
            }]
        }, {
            id: 3,
            data: [{
                children: "Row 3 data for Column A"
            }, {
                children: "Row 3 data for Column B"
            }, {
                children: "Row 3 data for Column C"
            }]
        }]
    },
    render: args => {
        const [rows, setRows] = useState(args.rows);

        return <Table
            {...args}
            rows={rows}
            onDragDrop={simpleDndSorting(rows, setRows)}
        />
    }
}

export const Selectable: Story = {
    args: {
        head: [{
            label: "Column A"
        }, {
            label: "Column B"
        }, {
            label: "Column C"
        }],
        rows: [{
            id: 1,
            data: [{
                children: "Row 1 data for Column A"
            }, {
                children: "Row 1 data for Column B"
            }, {
                children: "Row 1 data for Column C"
            }]
        }, {
            id: 2,
            data: [{
                children: "Row 2 data for Column A"
            }, {
                children: "Row 2 data for Column B"
            }, {
                children: "Row 2 data for Column C"
            }]
        }, {
            id: 3,
            data: [{
                children: "Row 3 data for Column A"
            }, {
                children: "Row 3 data for Column B"
            }, {
                children: "Row 3 data for Column C"
            }]
        }],
        selected: []
    },
    render: args => {
        const [selected, setSelected] = useState(args.selected);

        return <Table
            {...args}
            selected={selected}
            onChangeSelected={setSelected}
        />
    }
}

export const SelectableAndDraggable: Story = {
    args: {
        head: [{
            label: "Column A"
        }, {
            label: "Column B"
        }, {
            label: "Column C"
        }],
        rows: [{
            id: 1,
            data: [{
                children: "Row 1 data for Column A"
            }, {
                children: "Row 1 data for Column B"
            }, {
                children: "Row 1 data for Column C"
            }]
        }, {
            id: 2,
            data: [{
                children: "Row 2 data for Column A"
            }, {
                children: "Row 2 data for Column B"
            }, {
                children: "Row 2 data for Column C"
            }]
        }, {
            id: 3,
            data: [{
                children: "Row 3 data for Column A"
            }, {
                children: "Row 3 data for Column B"
            }, {
                children: "Row 3 data for Column C"
            }]
        }],
        selected: []
    },
    render: args => {
        const [rows, setRows] = useState(args.rows);
        const [selected, setSelected] = useState(args.selected);

        return <Table
            {...args}
            rows={rows}
            onDragDrop={simpleDndSorting(rows, setRows)}
            selected={selected}
            onChangeSelected={setSelected}
        />
    }
}