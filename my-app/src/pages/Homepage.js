import React, { Component } from "react";
import Message from "../components/MessagePost";
import ViewTenant from "../components/AdminViewTenant";
import TenantForm from "../components/AdminAddTenant";
import $ from "jquery";
import API from '../utils/API';
import { MessageListItem, MessageList } from "../components/MessageView";
import Timer from "../components/Timer"

class Homepage extends Component {
  state = {
    username: "",
    id: "",
    admin_status: true
  };

  componentDidMount() {
    // this.authenticateSession();
  }

  getCredentials = username => {
    $.ajax({
      type: "GET",
      url: "http://localhost:3001/login/" + username,
      data: { username: username }
    }).then(res => {
      this.setState({
        username: res.username,
        id: res.id,
        admin_status: res.admin_status,
        messages: []
      });
    });
  };

  authenticateSession = () => {
    let data = sessionStorage.getItem(
      "firebase:authUser:AIzaSyAHG7wWYd4h2W2u4kbhLGRPpM5CtwBENJM:[DEFAULT]"
    );
    let parsedData = JSON.parse(data);
    // console.log(parsedData);
    let uid = parsedData.uid;
    let email = parsedData.email;

    console.log("Session storage UID: " + uid);
    console.log("Session storage email: " + email);

    this.getCredentials(email);
  };

  populateMessages = event => {
    event.preventDefault();
    API.getPosts()
      .then(res => this.setState({ messages: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.admin_status === true) {
      return (
        <div>
          <TenantForm />
          <ViewTenant />
          <Timer />
          {/* <MessageList>
            {this.state.messages.map(message => {
              return (
                <MessageListItem
                  key={message.id}
                  message_content={message.message_content}
                  username={message.username}
                  date={message.createdAt}
                />
              );
            })}
          </MessageList> */}
        </div>
      );
    } else if (this.state.admin_status === false) {
      return (
        <div>
          {/* <Message />
          <MessageList>
            {this.state.messages.map(message => {
              return (
                <MessageListItem
                  key={message.id}
                  message_content={message.message_content}
                  username={message.username}
                  date={message.createdAt}
                />
              );
            })}
          </MessageList> */}
        </div>
      );
    }
  }
}

export default Homepage;
