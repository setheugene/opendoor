import React from "react";
import "./style.css";


function Nav() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light" >
      <a className="navbar-brand" href="#"><i className="fas fa-door-open"></i> </a>
      Open Door
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
      );
}

export default Nav;