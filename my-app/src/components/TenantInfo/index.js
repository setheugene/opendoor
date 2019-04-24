import React from "react";
import "./style.css";

function TenantInfo() {

    return (
        <div className="container col-sm-4">
            <h1>Tenant Info</h1>
            <p> Move In Date:</p>
            <p> Rent Due Date:</p>

            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick"></input>
            <input type="hidden" name="hosted_button_id" value="D7Q9VBYZDKT94"></input>
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
        </form>

            <button type="button" className="btn btn-primary">Maintenance Request</button><br></br>
            <button type="button" className="btn btn-primary">Lease Info</button>
    </div>
    );
}

export default TenantInfo;