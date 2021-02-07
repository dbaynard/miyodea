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

type EntryProps = {
  rounds: number;
  n: number;
  name: string;
  variants?: string[];
  rng?: () => number;
};

const pickRandomly = <T,>(xs: T[], rng = Math.random): T | null =>
  xs.reduce(
    ({ acc, w }: { acc: number; w: T | null }, v) => {
      const r = rng();
      return r > acc ? { acc: r, w: v } : { acc, w };
    },
    { acc: 0, w: null }
  ).w;

const Entry = ({ rounds, n, name, variants, rng }: EntryProps) => (
  <ListGroup.Item>
    <Badge variant="primary">{n}</Badge> {name}
    {variants ? ` (${pickRandomly(variants, rng)}) ` : " "}
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
  const viable = workouts.filter((w) => !w.equipment);
  const entries = shuffle(viable, rng)
    .slice(0, rounds - 1)
    .flatMap((x, n) => (n === 0 ? [{ name: "Plank" }, x] : x))
    .map((props, n) => <Entry n={n + 1} {...{ ...props, rounds, rng }} />);

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
                <InputGroup.Text onClick={() => setSeed(rng.int32())}>
                  Seed
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={seed?.toString() ?? ""}
                htmlSize={10}
                onChange={({ target }) => {
                  const i = Number.parseInt(target?.value);
                  isNaN(i) ? setSeed(rng.int32()) : setSeed(i);
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
