import React from "react";
import "./style.css";

export function MessageList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

export function MessageListItem({ message_content, username, admin, date, onClick }) {
  //split date from mysql database
  var t = date.split(/[- T . :]/);
  // console.log(t);

  //use Javascript Date to convert to date object
  var d = new Date(t[0], t[1] - 1, t[2], t[3] - 5, t[4]);
  // console.log(d);

  //convert object to string so it can be used by react
  var message_date = String(d);
  // console.log(message_date);

  //split string to get rid of unwanted information
  var tt = message_date.split(/[ " " : ]/);
  // console.log(tt);

  //create variable that holds the parts to display
  var print =
    tt[0] + ", " + tt[1] + " " + tt[2] + ", " + tt[3] + " @ " + tt[4] + ":" + tt[5];

  // console.log(print);

  return (
    <div>
      <li className="list-group-item" id="messages">

        <p id="time">{print} <button id="message-delete" className="fas fa-map-pin" onClick={onClick}> X</button></p>
        <p id="message">{message_content}</p>
        <p id="user-post">{username}
          {admin}
        </p>
      </li>
    </div>
  );
}