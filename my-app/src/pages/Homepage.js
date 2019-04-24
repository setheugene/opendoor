import React, { Component } from "react";
import Message from "../components/MessagePost";
import TenantInfo from "../components/TenantInfo";
import TenantForm from "../components/AdminAddTenant";



class Homepage extends Component {

    render() {
        return (
            <div>
                <Message />
                <TenantInfo />
                <TenantForm />
            </div>
        )
    }
};

export default Homepage;

