import React from "react";
import { Badge, ListGroup } from "react-bootstrap";

import workouts from "./workouts.json";

type EntryProps = { n: number; name: string };

const Entry = ({ n, name }: EntryProps) => (
  <ListGroup.Item>
    <Badge variant="primary">{n}</Badge> {name}
  </ListGroup.Item>
);

const Routine = () => (
  <ListGroup as="ol">
    {workouts
      .map(({ name }, n) => <Entry n={n + 1} {...{ name }} />)
      .slice(0, 12)}
  </ListGroup>
);

export { Routine };
