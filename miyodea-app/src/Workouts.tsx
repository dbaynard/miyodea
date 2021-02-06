import React, { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import DataTable from "react-data-table-component";

import workouts from "./workouts.json";

type Workout = {
  name: string;
  targets: string[];
  variants?: string[];
  equipment?: string;
};

const columns = [
  { name: "Workout", selector: "name", sortable: true },
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

type TextFilterProps = { setFilter: (_: string) => void };

const TextFilter = ({ setFilter }: TextFilterProps) => (
  <InputGroup>
    <FormControl
      placeholder="All"
      onChange={({ target }) => setFilter(target.value)}
    />
  </InputGroup>
);

const Workouts = () => {
  const [filterText, setFilterText] = useState<string | null>(null);

  const data = workouts.filter(
    (w) =>
      !filterText ||
      [w.name, ...w.targets, ...(w.variants ?? [])].some((t) =>
        t.toLowerCase().includes(filterText.toLowerCase())
      )
  );

  return (
    <DataTable
      title="Workouts"
      columns={columns}
      data={data}
      keyField="name"
      striped
      subHeader
      subHeaderComponent={<TextFilter setFilter={setFilterText} />}
    />
  );
};

export { Workouts };
