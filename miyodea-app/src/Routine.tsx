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

const Routine = ({ workouts }: RoutineProps) => {
  const [rounds, setRounds] = useState<number>(defaultRounds);

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
        </Row>
      </header>
      <Row>
        <Col>
          <ListGroup as="ol">
            {workouts
              .map(({ name }, n) => <Entry n={n + 1} {...{ name, rounds }} />)
              .slice(0, rounds)}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export { Routine };
