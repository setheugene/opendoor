import React from "react";
import "./style.css";

function Login() {
    return (
        <div className="container">
            <form>
                <div className="form-login">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="login-email"  placeholder="Enter email"></input>
                </div>
                <div className="form-login">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="login-password" placeholder="Password"></input>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
            </form>
        </div>

    );
}

export default Login;