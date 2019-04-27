import React from "react";
import "./style.css";


export function MessageList({children}) {

    return <ul className="list-group">{children}</ul>;

}

export function MessageListItem({
    message_content,
    username,
    date
}) {
    return (
        <div>
        <li className="list-group-item">
        <p>{username}{message_content}{date}</p>
        </li>
        </div>
    );
}