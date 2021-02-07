import React from "react";
import { Badge, ListGroup } from "react-bootstrap";

import { Workout } from "./Workouts";

type EntryProps = { n: number; name: string };

const Entry = ({ n, name }: EntryProps) => (
  <ListGroup.Item>
    <Badge variant="primary">{n}</Badge> {name}
  </ListGroup.Item>
);

export type RoutineProps = { workouts: Workout[] };

const Routine = ({ workouts }: RoutineProps) => (
  <ListGroup as="ol">
    {workouts
      .map(({ name }, n) => <Entry n={n + 1} {...{ name }} />)
      .slice(0, 12)}
  </ListGroup>
);

export { Routine };
