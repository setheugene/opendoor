import React from "react";
import "./style.css";
import Moment from "react-moment";
import 'moment-timezone'



export function MessageList({ children }) {

    return <ul className="list-group">{children}</ul>;

}

export function MessageListItem({ message_content, username, admin, date }) {
    const dateToFormat = {date}
    
    return (
        <div className="messageList">
            <li className="list-group-item" id="messages">
                <h5>Post from: {username}{admin}</h5>
                <p id="message">{message_content}</p>
                <Moment>{dateToFormat}</Moment>
            </li>
        </div>
    );
}