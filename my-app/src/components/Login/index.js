import React from "react";
import "./style.css";

function Login(props) {
    return (
        <div className="container" id="login-cont">
            <form onSubmit={props.handleLoginClick}>
                <h1>Login or Create an Account</h1>
                <div className="form-login">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" value={props.email} onChange={props.handleEmailChange} className="form-control" id="login-email" placeholder="Enter email"></input>
                </div>
                <div className="form-login">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={props.password} onChange={props.handlePasswordChange} className="form-control" id="login-password" placeholder="Password"></input>
                </div>
                <div className="row">
                    <button type="submit" value="Submit" className="col-md-5 btn btn-primary">Log In</button>
                    <div className="col-md-2"></div>
                    <button type="submit" value="LogOut" className="col-md-5 btn btn-primary" id="btn-logout">Log Out</button>
                </div>
            </form>
        </div>

    );
}

export default Login;