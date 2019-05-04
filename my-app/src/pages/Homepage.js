import React, { Component } from "react";
import Message from "../components/MessagePost";
import { MessageListItem, MessageList } from "../components/MessageView";
import API from "../utils/API";
import { ViewTenant, TenantList } from "../components/AdminViewTenant";
import TenantForm from "../components/AdminAddTenant";
import Time from "../components/Timer"
import "./styleadmin.css";
import UpdateTenant from "../components/AdminUpdateTenant";
import "./style.css";


class Homepage extends Component {

    state = {
        username: "",
        id: "",
        admin_status: true,
        messages: [],
        tenants: [],
        toUpdate: {
            real_name: '',
            unit_number: '',
            rent_amount: '',
            rent_paid: '',
            contact: '',
            lease: '',
        }
    }

    componentDidMount() {
        this.authenticateSession();
        this.populateMessages();
        this.populateTenants();
    }

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
        let uid = parsedData.uid
        let email = parsedData.email

        console.log("Session storage UID: " + uid)
        console.log("Session storage email: " + email)

        this.getCredentials(email);
    };

    populateMessages = event => {
        API.getPosts()
            .then(res => this.setState({ messages: res.data }))
            .catch(err => console.log(err));
    }


    populateTenants = event => {
        API.getTenants()
            .then(res => this.setState({ tenants: res.data }))
            .catch(err => console.log(err));
    }

    tenantToUpdate = filterId => {
        let tenantToUpdate = this.state.tenants.find(tenant => tenant.id === filterId)
        console.log(tenantToUpdate)
        this.setState({ toUpdate: tenantToUpdate })
    }

    handleUpdateInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;

        this.setState({
            toUpdate: {
                ...this.state.toUpdate,
                [name]: value,
                rent_paid: event.target.checked
            }
        });
    };

    handleUpdateSubmit = event => {
        event.preventDefault();
        if (
            !this.state.toUpdate.real_name ||
            !this.state.toUpdate.unit_number ||
            !this.state.toUpdate.rent_amount ||
            !this.state.toUpdate.rent_paid ||
            !this.state.toUpdate.contact ||
            !this.state.toUpdate.lease
        ) {
            alert("Please fill out all required fields.");
        } else {
            this.sendUpdate();
        }
    }

    sendUpdate = event => { 
        console.log(this.state.toUpdate)
        API.updateTenant({
            id: this.state.toUpdate.id,
            real_name: this.state.toUpdate.real_name,
            unit_number: this.state.toUpdate.unit_number,
            rent_amount: this.state.toUpdate.rent_amount,
            rent_paid: this.state.toUpdate.rent_paid,
            contact: this.state.toUpdate.contact,
            lease: this.state.toUpdate.lease
        })
            .then(() => {
                console.log("Updated tenant!");
                alert("Updated!");
            });
    };


    render() {

        if (this.state.admin_status === true) { 

            return (
                <div>

                     <div className="container" id="button-cont">
                        <h1>Admin Utilites</h1>
                        <div className="row" id="button-row">
                            <div className="col-sm-4"> <Message />Add a Message</div>
                            <div className="col-sm-4"> <TenantForm />Add a Tenant</div>
                            <div className="col-sm-4"> <Message />View Documents</div>
                        </div>
                    </div>
                    <div className="container" id="message-view-cont">
                        <h1>Message Board</h1>
                        <MessageList>
                            {this.state.messages.map(message => {
                                return (
                                    <MessageListItem
                                        key={message.id}
                                        message_content={message.message_content}
                                        username={message.User.username}
                                        date={message.createdAt}
                                        admin={message.User.admin_status}
                                    />
                                );
                            })}
                        </MessageList>
                    </div>
                    <TenantForm />
                    <ViewTenant>
                        {this.state.tenants.map(tenant => {
                            return (
                                <TenantList
                                    key={tenant.id}
                                    id={tenant.id}
                                    tName={tenant.real_name}
                                    tContact={tenant.contact}
                                    tUnit={tenant.unit_number}
                                    tRentPaid={tenant.rent_paid}
                                    grabUpdate={() => this.tenantToUpdate(tenant.id)}
                                />
                            );
                        })}
                    </ViewTenant>

                    <UpdateTenant
                        tenantToUpdate={this.state.toUpdate}
                        handleInput={this.handleUpdateInputChange}
                        handleSubmit={this.handleUpdateSubmit}
                        onClick={this.handleUpdateInputChange}
                    />
                    <Message />
                    <MessageList>
                        {this.state.messages.map(message => {
                            return (
                                <MessageListItem
                                    key={message.id}
                                    message_content={message.message_content}
                                    username={message.User.username}
                                    date={message.createdAt}
                                    admin={message.User.admin_status}
                                />
                            );
                        })}
                    </MessageList>
                </div>
            )
        } else if (this.state.admin_status === false) {
            return (
                <div>
                    <div className="container" id="button-cont">
                        <h1>User Utilites</h1>
                        <div className="row" id="button-row">
                            <div className="col-sm-4"> <Message />Add a Message</div>
                            <div className="col-sm-4"> <TenantForm />Add a Tenant</div>
                            <div className="col-sm-4"> <Message />View Documents</div>
                        </div>
                    </div>
                    <div className="container" id="message-view-cont">
                        <h1>Message Board</h1>
                        <MessageList>
                            {this.state.messages.map(message => {
                                return (
                                    <MessageListItem
                                        key={message.id}
                                        message_content={message.message_content}
                                        username={message.User.username}
                                        date={message.createdAt}
                                        admin={message.User.admin_status}
                                    />
                                );
                            })}
                        </MessageList>
                    </div>
                    <Message />
                    <MessageList>
                        {this.state.messages.map(message => {
                            return (
                                <MessageListItem
                                    key={message.id}
                                    message_content={message.message_content}
                                    username={message.username}
                                    date={message.createdAt}
                                    admin={message.User.admin_status}
                                />
                            );
                        })}
                    </MessageList>
                    <Time />
                </div>

            )
        }
    }
};

// ON CLICK OF UPDATE BUTTON, .FILTER THROUGH THIS.STATE.TENANTS FOR THE MATCHING ID
// SET THIS TO A NEW OBJECT THAT GETS PASSED TO THE STATE OF THE FORM WITH THIS.PROPS.WHATEVER




export default Homepage;

