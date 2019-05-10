import React, { Component } from "react";
import Login from "../components/Login";
import firebase from "firebase";
import About from "../components/About";
import API from "../utils/API";

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
                                console.log(idToken);
                                API.sendCredentials(idToken)
                                // WHY DOESNT THIS GET A RESPONSE?????????????
                                    .then((res) => {
                                        console.log(res);
                                        console.log("Verified user, redirecting...");
                                        window.location.replace("/home");
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
            </div>
        )
    }
}

export default LoginPage;