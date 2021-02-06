import React from "react";
import { Nav } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import "./App.css";

import { Workouts } from "./Workouts";

const Home = () => (
  <header className="App-header">
    <h1>Mi Yodea</h1>
    <h2>
      <i>a.k.a.</i> 12 Days of Christmas workout
    </h2>
    <p>Who knows one?</p>
  </header>
);

const TabNav = () => {
  const location = useLocation();
  return (
    <Nav variant="tabs" activeKey={location?.pathname ?? "/"} as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="/workouts" href="/workouts">
          Workouts
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

const Routing = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/workouts">
      <Workouts />
    </Route>
  </Switch>
);

const App = () => (
  <div className="App">
    <Router>
      <TabNav />
      <Routing />
    </Router>
  </div>
);

export default App;
