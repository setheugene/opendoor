import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from "./components/Navbar";
import Login from "./components/Login";
import TenantInfo from "./components/TenantForm";
import MessagePost from "./components/MessagePost";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Nav></Nav>
      <Login></Login>
      <TenantInfo></TenantInfo>
      <MessagePost></MessagePost>
      <Footer></Footer>
      </div>
    );
  }
}

export default App;
