import React, { Component } from "react";
import Message from "../components/MessagePost";
import { MessageListItem, MessageList } from "../components/MessageView";
import API from "../utils/API";
import { ViewTenant, TenantList } from "../components/AdminViewTenant";
import TenantForm from "../components/AdminAddTenant";
import Time from "../components/Timer"
import "./styleadmin.css";
import "./styleadmin.css";
import TenantInfo from "../components/TenantInfo";
import Maintenance from "../components/TenantMaintenance";


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
        // console.log(this.state.tenants);
        API.getTenants()
            .then(res => this.setState({ tenants: res.data }))
            .catch(err => console.log(err));
        // this.populateTenants();
    }

    tenantToUpdate = filterId => {
        let tenantToUpdate = this.state.tenants.find(tenant => tenant.id === filterId)
        // console.log(tenantToUpdate)
        this.setState({ toUpdate: tenantToUpdate })
        // console.log(this.state.toUpdate)
    }

    delPost = id => {
        console.log(this.state.messages)
        console.log(id)
        let toDeleteId = id
        API.deletePost(id)
            .then(() => {
                this.populateMessages();
            })
    }

    logOut = () => {
        sessionStorage.clear()
    }

    render() {
        if (this.state.admin_status === true) {

            return (
                <div>
                    <div className="container" id="button-cont">
                        <h1>Admin Utilites</h1>
                        <div className="row" id="button-row">
                            <div className="col-sm-4"> <Message
                                populateHandler={this.populateMessages}
                            />Add a Message</div>
                            <div className="col-sm-4"> <TenantForm
                                populateHandler={this.populateTenants}
                            />Add a Tenant</div>
                            <div className="col-sm-4"><a href="/"><button
                                id="card-button"
                                className="fas fa-sign-out-alt fa-7x"
                                onClick={this.logOut}
                            ></button></a></div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
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
                                                onClick={() => this.delPost(message.id)}
                                            />
                                        );
                                    })}
                                </MessageList>
                            </div>
                        </div>
                        <div className="col-sm-6">
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
                                            updating={this.state.toUpdate}
                                            populateHandler={this.populateTenants}
                                        />
                                    );
                                })}
                            </ViewTenant>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.admin_status === false) {
            const currentTenant = this.state.tenants.filter(tenant => tenant.User.id === this.state.id)
            return (
                <div>
                    <div className="container" id="button-cont">
                        <h1>Welcome {currentTenant[0].real_name}</h1>
                        <div className="row" id="button-row">
                            <div className="col-sm-4"> <Message
                                populateHandler={this.populateMessages}
                            />Add a Message</div>
                            <div className="col-sm-4"> <Maintenance
                                populateHandler={this.populateMessages}
                            />Maintenance Request</div>
                            <div className="col-sm-4"><a href="/"><button
                                id="card-button"
                                className="fas fa-sign-out-alt fa-7x"
                                onClick={this.logOut}
                            ></button></a></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
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
                                                onClick={() => this.delPost(message.id)}
                                            />
                                        );
                                    })}
                                </MessageList>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <TenantInfo
                                lease={currentTenant[0].lease}
                            />
                        </div>
                    </div>
                    <Time />
                </div>
            )
        }
    }
};

// ON CLICK OF UPDATE BUTTON, .FILTER THROUGH THIS.STATE.TENANTS FOR THE MATCHING ID
// SET THIS TO A NEW OBJECT THAT GETS PASSED TO THE STATE OF THE FORM WITH THIS.PROPS.WHATEVER




export default Homepage;
