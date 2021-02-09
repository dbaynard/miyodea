import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

import "./App.css";

import { Workouts } from "./Workouts";
import { Routine } from "./Routine";

import workouts from "./workouts.json";

const Home = () => (
  <header className="App-header">
    <h1>Mi Yodea</h1>
    <h2>
      <i>a.k.a.</i> 12 Days of Christmas workout
    </h2>
    <p>Who knows one?</p>
  </header>
);

const Tabbed = () => {
  const history = useHistory();
  const [key, setKey] = useState<string>(history.location.pathname);

  useEffect(() => {
    if (history.location.pathname !== key) history.push(key);
  }, [history, key]);

  useEffect(() => history.listen((location) => setKey(location.pathname)), [
    history,
  ]);

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k ?? "/")}>
      <Tab eventKey="/" title="Home">
        <Home />
      </Tab>
      <Tab eventKey="/routine" title="Routine">
        <Routine {...{ workouts }} />
      </Tab>
      <Tab eventKey="/workouts" title="Workouts">
        <Workouts {...{ workouts }} />
      </Tab>
    </Tabs>
  );
};

const App = () => (
  <div className="App">
    <Router basename={`${process.env.NODE_ENV === "test" ? "" : "/miyodea"}`}>
      <Tabbed />
    </Router>
  </div>
);

export default App;
