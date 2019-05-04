import React from "react";
import "./style.css";

function About(props) {
  return (
    <div className="container" id="about-cont">
      <h1> Features We Offer </h1>
      <div className="row ">
        <div className="col-md-6 box">
          <i class="far fa-envelope fa-5x" />
          <h2>Post Messages</h2>
          <p>
            Communication between landlords and tenants is easy. Post about
            upcoming event or just ask a neighbor for a cup of sugar.
          </p>
        </div>
        <div className="col-md-6 box">
          <i class="fas fa-comments-dollar fa-5x" />
          <h2>Pay Bills With Ease</h2>
          <p>
            Pay rent on time every month using your Paypal account. We even
            remind you how long till rent is due so you don't have to worry
            about late payments!
          </p>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-6 box">
          <i class="fas fa-tools fa-5x" />
          <h2>Request Maintenance</h2>
          <p>
            Smoke detector won't stop beeping? Have a leaky faucet? Easily let
            the landlord know about your issues and get them fixed quickly to
            prevent further damages.
          </p>
        </div>
        <div className="col-md-6 box">
          <i class="far fa-eye fa-5x" />
          <h2>View Lease Information</h2>
          <p>
            All your important documents kept safe in one place for easy access
            at anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
