import React, { useState } from "react";
import {
  Col,
  Row,
  Container,
  Badge,
  ListGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import seedrandom from "seedrandom";

import { Workout } from "./Workouts";

type EntryProps = { rounds: number; n: number; name: string };

const Entry = ({ rounds, n, name }: EntryProps) => (
  <ListGroup.Item>
    <Badge variant="primary">{n}</Badge> {name}{" "}
    <Badge variant="light">×{n * (rounds + 1 - n)}</Badge>
  </ListGroup.Item>
);

export type RoutineProps = { workouts: Workout[] };

const defaultRounds = 12;

const shuffle = <T,>(input: T[], rng = Math.random) => {
  const o = [...input];
  for (
    var j, x, i = o.length;
    i;
    j = Math.floor(rng() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
};

const Routine = ({ workouts }: RoutineProps) => {
  const [rounds, setRounds] = useState<number>(defaultRounds);
  const [seed, setSeed] = useState<number>(seedrandom().int32());

  const rng = seedrandom(seed.toString());
  const entries = shuffle(workouts, rng)
    .slice(0, rounds)
    .map(({ name }, n) => <Entry n={n + 1} {...{ name, rounds }} />);

  return (
    <Container>
      <header>
        <Row>
          <Col>
            <h1>Routine</h1>
          </Col>
        </Row>
        <Row>
          <Col md="auto">Total {0.5 * rounds * (rounds + 1)}</Col>
          <Col md="auto">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>#</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="12"
                htmlSize={2}
                onChange={({ target }) =>
                  setRounds(Number.parseInt(target?.value) || defaultRounds)
                }
              />
            </InputGroup>
          </Col>
          <Col md="auto">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Seed</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={seed?.toString() ?? ""}
                htmlSize={10}
                onChange={({ target }) => {
                  const i = Number.parseInt(target?.value);
                  isNaN(i) ? setSeed(seedrandom().int32()) : setSeed(i);
                }}
              />
            </InputGroup>
          </Col>
        </Row>
      </header>
      <Row>
        <Col>
          <ListGroup as="ol">{entries}</ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export { Routine };
