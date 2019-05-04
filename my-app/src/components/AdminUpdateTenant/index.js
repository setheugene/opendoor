import "./style.css";
import API from "../../utils/API";
import React, {Component} from "react";

class UpdateTenant extends Component {

    render() {
        return (
            <div className="container" id="tenant-cont">
                <h1>Update A Tenant</h1>
                <form className="form-group">
                    <input
                        className="form-control"
                        value={this.props.tenantToUpdate.real_name}
                        name="real_name"
                        onChange={this.props.handleInput}
                        type="text"
                        placeholder="Full Name"
                    />
                    <input
                        className="form-control"
                        value={this.props.tenantToUpdate.unit_number}
                        name="unit_number"
                        onChange={this.props.handleInput}
                        type="text"
                        placeholder="Unit Number"
                    />
                    <input
                        className="form-control"
                        value={this.props.tenantToUpdate.rent_amount}
                        name="rent_amount"
                        onChange={this.props.handleInput}
                        type="text"
                        placeholder="Rent Amount"
                    />
                    <input
                        className="form-control"
                        value={this.props.tenantToUpdate.contact}
                        name="contact"
                        onChange={this.props.handleInput}
                        type="text"
                        placeholder="Contact Phone Number"
                    />
                    <input
                        className="form-control"
                        value={this.props.tenantToUpdate.lease}
                        name="lease"
                        onChange={this.props.handleInput}
                        type="text"
                        placeholder="Paste Link to Rental Agreement"
                    />
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" checked={this.props.tenantToUpdate.rent_paid} onClick={this.props.onClick} className="custom-control-input" id="rentCheck" />
                        <label className="custom-control-label" for="rentCheck">Rent Paid?</label>
                    </div>
                    <button type="submit" onClick={this.props.handleSubmit}>
                        Update
              </button>
                </form>
            </div>
        )
    }
}





export default UpdateTenant;