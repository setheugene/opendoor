import React, { Component } from "react";
import "./style.css";
import API from '../../utils/API';

//write post for /api/addtenant

class TenantForm extends Component {
  // Setting the component's initial state
  state = {
    real_name: "",
    unit_number: "",
    rent_amount: "",
    rent_paid: false,
    contact: "",
    username: ""
  };


  handlePost = event => {
    API.addTenant(this.state.input)
      .then(() => {
        // reload the page
        console.log(this.state.input)
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
    if (!this.state.real_name || !this.state.unit_number || !this.state.rent_amount
      || !this.state.contact || !this.state.username){
        alert ("Please fill out all required fields.")
      } else {
        this.handlePost();
      }
        
    this.setState({
        real_name: "",
        unit_number: "",
        rent_amount: "",
        rent_paid: false,
        contact: "",
        username: ""
    });
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <form className="form-group">
          <input className="form-control"
            value={this.state.real_name}
            name="real_name"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Full Name"
          />
          <input className="form-control"
            value={this.state.unit_number}
            name="unit_number"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Unit Number"
          />
          <input className="form-control"
            value={this.state.rent_amount}
            name="rent_amount"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Rent Amount"
          />
          <lable>Has Paid Rent?</lable>
                    <input className="form-control"
            value={this.state.rent_paid}
            name="rent_paid"
            onChange={this.handleInputChange}
            type="checkbox"
            id="paid"
    
          />
                    <input className="form-control"
            value={this.state.contact}
            name="contact"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Contact Phone Number"
          />
                    <input className="form-control"
            value={this.state.username}
            name="username"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Username (e-mail)"
          />
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}


export default TenantForm;