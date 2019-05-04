import React from "react";
import "./style.css";

export function ViewTenant({ children }) {
    return (
        <div className="container" id="tenant-view-cont">
            <h1> Your Tenants </h1>

            <table className="table">
                <thead>
                    <th>Tenant Name</th>
                    <th>Tenant Contact</th>
                    <th>Unit #</th>
                    <th>Rent Paid</th>
                    <th>Edit Tenant</th>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>

    );
}


export function TenantList({ tName, tContact, tUnit, tRentPaid, id, grabUpdate }) {
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
                <button
                    type="submit"
                    value={id}
                    onClick={grabUpdate}>
                    Update
                </button>
            </td>
        </tr>
    );
}

