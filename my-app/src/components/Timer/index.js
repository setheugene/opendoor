import React from "react";
import "./style.css";
import Moment from "react-moment";
import "moment-timezone";

export default class Time extends React.Component {
    render() {
        var moment = require ("moment");
        let now = moment();
        console.log(now);
        let dueDate = "2019-06-01";

        return (
            <div className="container">
            <a href="https://docs.google.com/document/d/e/2PACX-1vSJoGPw7dSy6eCjDiJ2s--xsFgXDzollRhl9dTNU3GR33EV5QJPvBlC__Ihd5nAsSl2BkyUMdyxgq95/pub">Rental Agreement</a>
            <h1>Rent is Due in:</h1>
            <Moment to={dueDate}>{now}</Moment>
            </div>
        );
    }
}