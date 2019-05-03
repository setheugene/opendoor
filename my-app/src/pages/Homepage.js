import React, { Component } from "react";
import Message from "../components/MessagePost";
import { MessageListItem, MessageList } from "../components/MessageView";
import API from "../utils/API";
import ViewTenant from "../components/AdminViewTenant";
import TenantForm from "../components/AdminAddTenant";
import Time from "../components/Timer"
import "./style.css";

class Homepage extends Component {

    state = {
        username: "",
        id: "",
        admin_status: true,
        messages: []
    }

    componentDidMount() {
        this.authenticateSession();
        this.populateMessages();
    }

    getCredentials = (username) => {
        API.getCredentials(username)
            .then((res) => {
                this.setState({
                    username: res.data.username,
                    id: res.data.id,
                    admin_status: res.data.admin_status
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

    populateMessages = event => {
        API.getPosts()
            .then(res => this.setState({ messages: res.data }))
            .catch(err => console.log(err));
    }


    render() {

        if (this.state.admin_status === true) {

            return (
                <div>
                    <div className="container" id="button-cont">
                        <h1>Admin Utilites</h1>
                        <div className="row" id="button-row">
                            <div className="col-sm-4"> <Message />Add a Message</div>
                            <div className="col-sm-4"> <TenantForm />Add a Tenant</div>
                            <div className="col-sm-4"> <Message />View Documents</div>
                        </div>
                    </div>
                    <ViewTenant />
                    <MessageList>
                        {this.state.messages.map(message => {
                            return (
                                <MessageListItem
                                    key={message.id}
                                    message_content={message.message_content}
                                    username={message.User.username}
                                    date={message.createdAt}
                                    admin={message.User.admin_status}
                                />
                            );
                        })}
                    </MessageList>
                </div>

            )
        } else if (this.state.admin_status === false) {
            return (
                <div>
                    <Message />
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
                    </MessageList>
                    <Time />
                </div>

            )
        }
    }
};

export default Homepage;

