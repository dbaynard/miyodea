import React, { useState } from "react";
import { Badge, InputGroup, FormControl } from "react-bootstrap";
import DataTable from "react-data-table-component";

type Target = "core" | "arms" | "legs";

export type Workout = {
  name: string;
  targets: Target[];
  variants?: string[];
  equipment?: string;
};

const columns = [
  { name: "Workout", selector: "name", sortable: true },
  {
    name: "Targets",
    selector: "targets",
    format: (row: Workout) =>
      row.targets.map((v) => (
        <Badge key={v} pill variant="info">
          {v}
        </Badge>
      )),
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

type Filter = { text?: string };

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

type FilterProps = { setFilter: StateSetter<Filter> };

const TextFilter = ({ setFilter }: FilterProps) => (
  <InputGroup>
    <FormControl
      placeholder="All"
      onChange={({ target }) =>
        setFilter((f: Filter) => ({ ...f, text: target.value }))
      }
    />
  </InputGroup>
);

type WorkoutsProps = {
  workouts: Workout[];
  setWorkouts: StateSetter<Workout[]>;
};

const Workouts = ({ workouts }: WorkoutsProps) => {
  const [filter, setFilter] = useState<Filter>({});

  const data = workouts.filter(
    (w) =>
      !filter.text ||
      [w.name, ...w.targets, ...(w.variants ?? [])].some((t) =>
        t.toLowerCase().includes(filter?.text?.toLowerCase() ?? "")
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
      subHeaderComponent={<TextFilter {...{ setFilter }} />}
    />
  );
};

export { Workouts };
