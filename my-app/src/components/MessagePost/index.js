import React from "react";
import "./style.css";

function MessagePost() {
    return (
        <div className="container">
            <form>
                <div className="form-message-post">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" id="message-name" placeholder="Please Enter Your Name"></input>
                </div>
                <div className="form-message-post">
                    <label for="exampleInputPassword1">Room Number</label>
                    <input type="text" className="form-control" id="login-password" placeholder="Room #"></input>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Write a Message</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button type="button" class="btn btn-primary">Primary</button>
            </form>
        </div>

    );
}

export default MessagePost;