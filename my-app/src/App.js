import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import * as firebase from "firebase/app";
import Nav from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Message from "./components/MessagePost";
import Homepage from "./pages/Homepage";


var config = {
  apiKey: "AIzaSyAHG7wWYd4h2W2u4kbhLGRPpM5CtwBENJM",
  authDomain: "opendoor-9b5d6.firebaseapp.com",
  databaseURL: "https://opendoor-9b5d6.firebaseio.com",
  projectId: "opendoor-9b5d6",
  storageBucket: "opendoor-9b5d6.appspot.com",
  messagingSenderId: "837041376330"
};
firebase.initializeApp(config)



function App() {
  return (
    <Router>
        <Nav />
          <Route exact path="/" component={Login} />
          <Route exact path="/tenant" component={Homepage} />
        <Footer />
    </Router>

  )
};

export default App;
