import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class TenantForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      real_name: "",
      unit_number: "",
      rent_amount: "",
      contact: "",
      username: "",
      rental_agreement: ""
    };
  }
  handleClose() {
    this.props.populateHandler();
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handlePost = event => {
    API.addTenant({
      real_name: this.state.real_name,
      unit_number: this.state.unit_number,
      rent_amount: this.state.rent_amount,
      contact: this.state.contact,
      username: this.state.username,
      lease: this.state.rental_agreement
    })
      .then(() => {
        alert("Tenant Added");
        this.handleClose();
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      })
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
    event.preventDefault();
    if (
      !this.state.real_name ||
      !this.state.unit_number ||
      !this.state.rent_amount ||
      !this.state.contact ||
      !this.state.username ||
      !this.state.rental_agreement
    ) {
      alert("Please fill out all required fields.");
    } else {
      this.handlePost();
    }

    this.setState({
      real_name: "",
      unit_number: "",
      rent_amount: "",
      contact: "",
      username: "",
      rental_agreement: ""
    });
    console.log(this.state);

  };

  render() {
    return (
      <div>
        <button className="fas fa-address-card fa-7x" id="card-button" onClick={this.handleShow}></button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a New Tenant</Modal.Title>
          </Modal.Header>
          <Modal.Body> <form className="form-group" onSubmit={this.handleFormSubmit}>
            <input
              className="form-control"
              value={this.state.real_name}
              name="real_name"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Full Name"
            />
            <input
              className="form-control"
              value={this.state.unit_number}
              name="unit_number"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Unit Number"
            />
            <input
              className="form-control"
              value={this.state.rent_amount}
              name="rent_amount"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Rent Amount"
            />
            <input
              className="form-control"
              value={this.state.contact}
              name="contact"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Contact Phone Number"
            />
            <input
              className="form-control"
              value={this.state.username}
              name="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Username (e-mail)"
            />
            <input
              className="form-control"
              value={this.state.rental_agreement}
              name="rental_agreement"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Paste Link to Rental Agreement"
            />
            <button type="submit">
              Add
          </button>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default TenantForm;
