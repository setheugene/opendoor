import React, { Component } from "react";
import Login from "../components/Login";
import firebase from "firebase";
import $ from 'jquery'; 


class LoginPage extends Component {

    state ={
        email: "",
        password: "",
        admin: false

    };
    handleEmailChange = event => {
        this.setState({ email: event.target.value });
      };
    

    handlePasswordChange = event => {
        this.setState({ password: event.target.value})
      };
    
    

    sendCredentials = token => {
        $.ajax({
            type: "POST",
            url: "/login",
            data: { 'token': token }
        })
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
                            .then((idToken)  => {
                                this.sendCredentials(idToken)
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
    }

    render() {
        return (
            <div>
                <Login handleLoginClick={this.handleLoginClick} handlePasswordChange={this.handlePasswordChange} handleEmailChange={this.handleEmailChange}/>
            </div>
        )
    }
}

export default LoginPage;