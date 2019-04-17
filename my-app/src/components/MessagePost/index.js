import React, { Component } from "react";

class Message extends Component {
  // Setting the component's initial state
  state = {
    input: "",
    post: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    let posts = [];
    event.preventDefault();
    if (!this.state.input) {
      alert("Please insert a message before clicking submit.");
    } else {
      posts.push(`${this.state.input}`);
    }

    this.setState({
      input: ""
    });
    console.log(posts);
  };

  render() {
    return (
      <div>
        <form className="form">
          <input
            value={this.state.input}
            name="input"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Enter Message Here"
          />
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Message;
