import React from "react";
import "./style.css";

function Login(props) {
    return (
        <div className="container">
            <form onSubmit={props.handleLoginClick}>
                <div className="form-login">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" value={props.email} onChange={props.handleEmailChange} className="form-control" id="login-email"  placeholder="Enter email"></input>
                </div>
                <div className="form-login">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={props.password} onChange={props.handlePasswordChange} className="form-control" id="login-password" placeholder="Password"></input>
                </div>
                <button type="submit" value="Submit" className="btn btn-primary">Log In</button>
            </form>
        </div>

    );
}

export default Login;