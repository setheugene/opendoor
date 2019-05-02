import React from "react";
import "./style.css";
import Moment from "react-moment";
import "moment-timezone";

export default class Time extends React.Component {
    render() {
        var moment = require ("moment");
        let now = moment();
        console.log(now);
        let dueDate = moment().endOf('month');
        console.log(dueDate);
        
        return (
            <div className="container">
            <h1>Rent is Due in:</h1>
            <Moment to={dueDate}>{now}</Moment>
            </div>
        );
    }
}