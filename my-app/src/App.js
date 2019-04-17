import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Navbar";
import Message from "./components/MessagePost/index";
// import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
      // <Router>
      <div className="App">
        <Nav />
        <header className="App-header">
          {/* <Route exact path="/about" component={About} /> */}
          <Message />
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
            Click the fucking link
          </a>
        </header>
      </div>
      // </Router>
    );
  }
}

export default App;
