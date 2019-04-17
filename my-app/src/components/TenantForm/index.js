import React from "react";
import "./style.css";

function TenantInfo() {

    return (
        <div className="container col-sm-4">
            <h1>Tenant Info</h1>
            <p> Move In Date:</p>
            <p>Rent Due Date:</p>
            <button type="button" class="btn btn-primary">Pay Rent</button><br></br>
            <button type="button" class="btn btn-primary">Maintenance Request</button><br></br>
            <button type="button" class="btn btn-primary">Lease Info</button>
    </div>
    );
}

export default TenantInfo;