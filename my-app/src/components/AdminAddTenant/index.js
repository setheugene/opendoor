import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";

class TenantForm extends Component {
  // Setting the component's initial state
  state = {
    real_name: "",
    unit_number: "",
    rent_amount: "",
    contact: "",
    username: "",
    rental_agreement: ""
  };

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
        console.log("Tenant Added");
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
      <div className="container" id="tenant-cont">
        <h1> Add A New Tenant</h1>
        <form className="form-group">
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
          <button type="submit" onClick={this.handleFormSubmit}>
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default TenantForm;
