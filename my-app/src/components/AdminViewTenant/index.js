import React from "react";
import "./style.css";
import UpdateTenant from "../AdminUpdateTenant"

export function ViewTenant({ children }) {
    return (
        <div className="container" id="tenant-view-cont">
            <h1> Your Tenants </h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Unit #</th>
                        <th>Rent Paid</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>

    );
}


export function TenantList({ tName, tContact, tUnit, tRentPaid, id, grabUpdate, updating, populateHandler}) {

    // console.log(updating);
    let rentCheck = "";
    if (tRentPaid) {
        rentCheck = "paid"
    } else {
        rentCheck = "not paid"
    }

    return (
        <tr>
            <td>{tName}</td>
            <td>{tContact}</td>
            <td>{tUnit}</td>
            <td>{rentCheck}</td>
            <td>
                <UpdateTenant
                    value={id}
                    onClick={grabUpdate}
                    tenantToUpdate={updating}
                    populateHandler={populateHandler} />

            </td>
        </tr>
    );
}
