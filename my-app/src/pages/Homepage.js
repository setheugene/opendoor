import React, { Component } from "react";
import Message from "../components/MessagePost";
import TenantInfo from "../components/TenantInfo";
import TenantForm from "../components/AdminAddTenant";
import $ from 'jquery';



class Homepage extends Component {

    state = {
        username: "",
        id: "",
        admin_status: true
    }

    componentDidMount() {
        this.authenticateSession();
    }

    getCredentials = (username) => {
        $.ajax({
            type: "GET",
            url: "http://localhost:3001/login/" + username,
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

    render() {

        if (this.state.admin_status === true) {
            console.log("DATABSE ID: " + this.state.id);
            console.log("DATABSE USERNAME: " + this.state.username);
            console.log("SHOWING ADMIN VIEW: " + this.state.admin_status)
            return (
                <div>
                    <h1>ADMIN PAGE</h1>
                    <Message />
                </div>

            )
        } else if (this.state.admin_status === false) {
            console.log("DATABSE ID: " + this.state.id);
            console.log("DATABSE USERNAME: " + this.state.username);
            console.log("SHOWING ADMIN VIEW: " + this.state.admin_status)
            return (
                <div>
                    <h1>TENANT PAGE</h1>
                    <TenantInfo />
                </div>

            )
        }
    }
};

export default Homepage;

