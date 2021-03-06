import React, { Component } from 'react';
import "./style.css";
import Message from "../MessagePost";

class TenantHome extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false };
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div className="container" id="portfolio-body">

                <h1 id="h1-test">Admin Utilities</h1>

                <div className="row">

                    <div className="col-md-6" id="img-body">
                        Add a Tenant
                        <button className="fas fa-address-card fa-7x" onClick={this.toggleModal}></button>
                    </div>

                    <div className="col-md-6" id="img-body">
                        Big Brother is Watching
                        <a className="fas fa-eye fa-7x" href="https://beer-me-project-2.herokuapp.com/" />
                    </div>

                </div>
                <div className="row">

                    <div className="col-md-6" id="img-body">
                        Add a Message
                        <a className="fas fa-envelope fa-7x" href="https://beer-me-project-2.herokuapp.com/" />
                    </div>

                    <div className="col-md-6" id="img-body">
                        View Messages
                        <a className="fas fa-comments fa-7x" href="https://beer-me-project-2.herokuapp.com/" />
                    </div>

                </div>
            </div>
        )
    }
}

export default TenantHome;