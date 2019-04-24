import React, { Component } from "react";
import "./style.css";

import API from '../../utils/API';

class Message extends Component {
  // Setting the component's initial state
  state = {
    input: "",
    post: ""
  };

  handlePost = event => {
    API.insertPost(this.state.input)
      .then(() => {
        // reload the page
        console.log(this.state.input)
      });
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    let posts = [];
    event.preventDefault();
    if (!this.state.input) {
      alert("Please insert a message before clicking submit.");
    } else {
      posts.push(`${this.state.input}`);
      this.handlePost();
    }

    this.setState({
      input: [posts]
    });
    console.log(posts);
   
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-message-post">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              id="message-name"
              placeholder="Please Enter Your Name"
            />
          </div>
          <div className="form-message-post">
            <label htmlFor="exampleInputPassword1">Room Number</label>
            <input
              type="text"
              className="form-control"
              id="login-password"
              placeholder="Room #"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Write a Message</label>
            <textarea
              value={this.state.input}
              onChange={this.handleInputChange}
     
              name="input"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            />
          </div>
          <button type="submit" value="Submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Message;