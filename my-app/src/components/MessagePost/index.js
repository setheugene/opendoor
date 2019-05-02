import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./style.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import API from '../../utils/API';

class Message extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      username: "",
      id: "",
      admin_status: "",
      message_content: "",
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  // Setting the component's initial state
  state = {
    username: "",
    id: "",
    admin_status: "",
    message_content: "",
  };

  componentDidMount() {
    this.authenticateSession();
  }

  // export this function and have it return an object
  getCredentials = (username) => {
    API.getCredentials(username)
      .then((res) => {
        this.setState({
          username: res.data.username,
          id: res.data.id,
          admin_status: res.data.admin_status
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

  handlePost = event => {
    console.log(this.state)
    API.insertPost({
      message_content: this.state.message_content,
      admin_status: this.state.admin_status,
      UserId: this.state.id,
    })
      .then(() => {
        console.log("success");
      });
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
    if (!this.state.message_content) {
      alert("Please insert a message before clicking submit.");
    } else {
      posts.push(`${this.state.message_content}`);
      this.handlePost();
    }

    this.setState({
      message_content: [posts]
    });
    console.log(posts);

  };

  render() {

    return (

      <div className="container" id="messageForm">
        <button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body><form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Write a Message</label>
              <textarea
                value={this.state.message_content}
                onChange={this.handleInputChange}

                name="message_content"
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              />
            </div>
            <button type="submit" value="Submit" className="btn btn-primary">
              Submit
          </button>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}

Message.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};


export default Message;