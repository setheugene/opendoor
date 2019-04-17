import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Navbar";
import Login from "./components/Login";
import TenantInfo from "./components/TenantForm";
import Footer from "./components/Footer";
import Message from "./components/MessagePost";
// import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
      // <Router>
      <div className="App">
      <Nav></Nav>
      <Login></Login>
      <TenantInfo></TenantInfo>
      <Message></Message>
      <Footer></Footer>
      </div>
      // </Router>
    );
  }
}

export default App;
