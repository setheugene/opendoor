import React from "react";
import "./style.css";

function TenantInfo(props) {
    return (
        <div className="col-sm-12" id="info-cont">
            <h1>Tenant Info</h1>
            <a href={props.lease} target="blank"><button className="far fa-eye fa-5x" id="leaseInfo" ></button></a>
            <div className="row" id="text-row">
                <div className="col-sm-12">
                    View Documents
            </div>
            </div>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick"></input>
                <input type="hidden" name="hosted_button_id" value="D7Q9VBYZDKT94"></input>
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
            </form>
        </div>
    );
}

export default TenantInfo;