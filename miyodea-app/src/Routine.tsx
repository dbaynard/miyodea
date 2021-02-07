import React from "react";
import { Container, Badge, ListGroup } from "react-bootstrap";

import { Workout } from "./Workouts";

type EntryProps = { n: number; name: string };

const Entry = ({ n, name }: EntryProps) => (
  <ListGroup.Item>
    <Badge variant="primary">{n}</Badge> {name}{" "}
    <Badge variant="light">×{n * (13 - n)}</Badge>
  </ListGroup.Item>
);

export type RoutineProps = { workouts: Workout[] };

const Routine = ({ workouts }: RoutineProps) => (
  <Container>
    <header>
      <h1>Routine</h1>
    </header>
    <ListGroup as="ol">
      {workouts
        .map(({ name }, n) => <Entry n={n + 1} {...{ name }} />)
        .slice(0, 12)}
    </ListGroup>
  </Container>
);

export { Routine };
