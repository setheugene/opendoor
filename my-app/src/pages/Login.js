import React, { Component } from "react";
import Login from "../components/Login";
import firebase from "firebase";
import $ from 'jquery';
import About from "../components/About";

class LoginPage extends Component {

    state = {
        email: "",
        password: "",
        admin: false

    };
    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    };


    handlePasswordChange = event => {
        this.setState({ password: event.target.value })
    };



    sendCredentials = token => {
        $.ajax({
            type: "POST",
            url: "/login",
            data: { 'token': token }
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
    }


    handleLoginClick = event => {
        event.preventDefault();
        console.log(this.state.email)
        console.log(this.state.password)
        const auth = firebase.auth();
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password);
                return promise
                    .then((res) => {
                        console.log("Logged in")
                        console.log(res)
                        firebase.auth().currentUser.getIdToken(true)
                            .then((idToken) => {
                                this.sendCredentials(idToken)
                                    .then(() => {
                                        this.authenticateSession()
                                    })
                                    .catch((err) => {
                                        throw err;
                                    })
                            })
                            .catch((err) => {
                                throw err;
                            })
                    })
                    .catch((err) => {
                        throw err;
                    })
            })
        }

    render() {
        return (
            <div>
                <Login handleLoginClick={this.handleLoginClick} handlePasswordChange={this.handlePasswordChange} handleEmailChange={this.handleEmailChange} />
                <About />
            </div >
        )
    }
}

export default LoginPage;