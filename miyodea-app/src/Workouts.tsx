import React from "react";
import DataTable from "react-data-table-component";

import workouts from "./workouts.json";

type Workout = {
  name: string;
  targets: string[];
  variants?: string[];
  equipment?: string;
};

const columns = [
  { name: "Workout", selector: "name" },
  {
    name: "Targets",
    selector: "targets",
    format: (row: Workout) => row.targets.join(", "),
  },
  {
    name: "Variants",
    selector: "variants",
    format: (row: Workout) => row.variants?.join(", "),
    wrap: true,
    style: { textAlign: "left" } as const,
  },
  { name: "Equipment", selector: "equipment" },
];

const Workouts = () => (
  <DataTable
    title="Workouts"
    columns={columns}
    data={workouts}
    keyField="name"
    striped
  />
);

export { Workouts };
