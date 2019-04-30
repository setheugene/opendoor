import React, { Component } from "react";
import "./style.css";
import $ from "jquery";

import API from '../../utils/API';

class Message extends Component {
  // Setting the component's initial state
  state = {
    username: "",
    id: "",
    admin_status: "",
    message_content: "",
  };

  componentDidMount() {
    this.authenticateSession();
  }

  // export this function and have it return an object
  getCredentials = (username) => {
    $.ajax({
      type: "GET",
      url: "/login/" + username,
      data: { 'username': username }
    }).then((res) => {
      this.setState({
        username: res.username,
        id: res.id,
        admin_status: res.admin_status
      })
    })
  }

  authenticateSession = () => {
    let data = sessionStorage.getItem("firebase:authUser:AIzaSyAHG7wWYd4h2W2u4kbhLGRPpM5CtwBENJM:[DEFAULT]")
    let parsedData = JSON.parse(data);
    // console.log(parsedData);
    let uid = parsedData.uid
    let email = parsedData.email

    console.log("Session storage UID: " + uid)
    console.log("Session storage email: " + email)

    this.getCredentials(email);
  };

  handlePost = event => {
    console.log(this.state)
    API.insertPost({
      message_content: this.state.message_content,
      admin_status: this.state.admin_status,
      UserId: this.state.id,
    })
      .then(() => {
        console.log("success");
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
    if (!this.state.message_content) {
      alert("Please insert a message before clicking submit.");
    } else {
      posts.push(`${this.state.message_content}`);
      this.handlePost();
    }

    this.setState({
      message_content: [posts]
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
              value={this.state.message_content}
              onChange={this.handleInputChange}

              name="message_content"
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