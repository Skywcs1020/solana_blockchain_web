<<<<<<< HEAD:pages/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import ViewPage from "./ViewPage/ViewPage";
import UpdatePage from "./UpdatePage/UpdatePage";
import Navbar from "./component/Navbar/Navbar";
=======
import logo from './logo.svg';
import './App.css';
>>>>>>> parent of 8916f9f (Done simple frontend setup):src/App.js

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
