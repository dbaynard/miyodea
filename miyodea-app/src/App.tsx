import React from "react";
import { Tabs, Tab } from "react-bootstrap";

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

const App = () => (
  <div className="App">
    <Tabs>
      <Tab eventKey="home" title="Home">
        <Home />
      </Tab>
      <Tab eventKey="workouts" title="Workouts">
        <Workouts />
      </Tab>
    </Tabs>
  </div>
);

export default App;
