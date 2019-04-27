import React from "react";
import "./style.css";
import Moment from "react-moment";
import "moment-timezone";

export default class Time extends React.Component {
    render() {
        var moment = require ("moment");
        let now = moment();
        console.log(now);
        let dueDate = "2019-05-01";

        return (
            <div className="container">
            <Moment to={dueDate}>{now}</Moment>
            </div>
        );
    }
}