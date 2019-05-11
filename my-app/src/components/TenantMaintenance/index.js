import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./style.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Maintenance extends Component {
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
    render() {
        return (
            <div>
                <button className="fas fa-tools fa-7x" id="card-button" onClick={this.handleShow}></button>
                <Modal show={this.state.show} onHide={this.handleClose} >
                    <Modal.Header id="message-modal-header" closeButton>
                        <Modal.Title>Place a Maintenance Request</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="message-modal"><form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"></label>
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
                            Post
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
export default Maintenance;