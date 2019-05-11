import "./style.css";
import API from "../../utils/API";
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class UpdateTenant extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            tenantToUpdate: {}
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (state.tenantToUpdate.id !== props.tenantToUpdate.id) {
            state.tenantToUpdate = props.tenantToUpdate;
        }
        return state
    }

    handleClose() {
        this.props.populateHandler();
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    onClick = (event) => {
        this.props.onClick();
        this.handleShow();
    }

    handleUpdateInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            tenantToUpdate: {
                ...this.state.tenantToUpdate,
                [name]: value,
                rent_paid: event.target.checked
            }
        });
    };

    handleUpdateSubmit = event => {
        event.preventDefault();
        if (
            !this.state.tenantToUpdate.real_name ||
            !this.state.tenantToUpdate.unit_number ||
            !this.state.tenantToUpdate.rent_amount ||
            !this.state.tenantToUpdate.contact ||
            !this.state.tenantToUpdate.lease
        ) {
            alert("Please fill out all required fields.");
        } else {
            this.sendUpdate();
        }
    }

    sendUpdate = event => {
        API.updateTenant({
            id: this.state.tenantToUpdate.id,
            real_name: this.state.tenantToUpdate.real_name,
            unit_number: this.state.tenantToUpdate.unit_number,
            rent_amount: this.state.tenantToUpdate.rent_amount,
            rent_paid: this.state.tenantToUpdate.rent_paid,
            contact: this.state.tenantToUpdate.contact,
            lease: this.state.tenantToUpdate.lease
        })
            .then(() => {
                console.log("Updated tenant!");
                alert("Updated!");
                this.handleClose();
            });
    };

    render() {
        return (
            <div>
                <button className="Edit" id="card-button" onClick={this.onClick}>Update</button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header id="message-modal-header" closeButton>
                        <Modal.Title>Update a Tenant</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="tenant-edit">
                        <form className="form-group">
                            <input
                                className="form-control"
                                value={this.state.tenantToUpdate.real_name}
                                name="real_name"
                                onChange={this.handleUpdateInputChange}
                                type="text"
                                placeholder="Full Name"
                            />
                            <input
                                className="form-control"
                                value={this.state.tenantToUpdate.unit_number}
                                name="unit_number"
                                onChange={this.handleUpdateInputChange}
                                type="text"
                                placeholder="Unit Number"
                            />
                            <input
                                className="form-control"
                                value={this.state.tenantToUpdate.rent_amount}
                                name="rent_amount"
                                onChange={this.handleUpdateInputChange}
                                type="text"
                                placeholder="Rent Amount"
                            />
                            <input
                                className="form-control"
                                value={this.state.tenantToUpdate.contact}
                                name="contact"
                                onChange={this.handleUpdateInputChange}
                                type="text"
                                placeholder="Contact Phone Number"
                            />
                            <input
                                className="form-control"
                                value={this.state.tenantToUpdate.lease}
                                name="lease"
                                onChange={this.handleUpdateInputChange}
                                type="text"
                                placeholder="Paste Link to Rental Agreement"
                            />
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" checked={this.state.tenantToUpdate.rent_paid} onClick={this.handleUpdateInputChange} className="custom-control-input" id="rentCheck" />
                                <label className="custom-control-label" for="rentCheck">Rent Paid?</label>
                            </div>
                            <button type="submit" onClick={this.handleUpdateSubmit}>
                                Update
                            </button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer id="message-modal">
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}





export default UpdateTenant;