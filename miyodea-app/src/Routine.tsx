import React from "react";
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
      <Row>
        <Col>
          <h1>Routine</h1>
        </Col>
      </Row>
      <Row>
        <Col md="auto">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>#</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl placeholder="12" htmlSize={2} />
          </InputGroup>
        </Col>
      </Row>
    </header>
    <Row>
      <Col>
        <ListGroup as="ol">
          {workouts
            .map(({ name }, n) => <Entry n={n + 1} {...{ name }} />)
            .slice(0, 12)}
        </ListGroup>
      </Col>
    </Row>
  </Container>
);

export { Routine };
