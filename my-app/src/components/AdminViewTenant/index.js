import React from "react";
import "./style.css";

function ViewTenant(props) {
    return (
        <div className="container" id="tenant-view-cont">
            <h1> Your Tenants </h1>
            <div className="row" id="tenant-view-row">
                <ul className="list-group list-group-horizontal" id="tenant-view-ul">
                    <div className="col-sm-3">
                        Tenant Name
                        <li className="list-group-item">{props.real_name}</li>
                    </div>
                    <div className="col-sm-3">
                        Move In Date
                        <li className="list-group-item">{props.unit_number}</li>
                    </div>
                    <div className="col-sm-3">
                        Rent Paid
                        <li className="list-group-item">{props.rent_paid}</li>
                    </div>
                    <div className="col-sm-3">
                        Contact
                        <li className="list-group-item">{props.contact}</li>
                    </div>
                </ul>
            </div>
        </div>

    );
}

export default ViewTenant;