import React from "react";
import "./App.css";
import { Workouts } from "./Workouts";

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1>Mi Yodea</h1>
      <h2>
        <i>a.k.a.</i> 12 Days of Christmas workout
      </h2>
      <p>Who knows one?</p>
    </header>
    <Workouts />
  </div>
);

export default App;
