import React from "react";
import { Link } from "react-router-dom";
import "./style.css";


function Nav() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light" >
      <Link className="navbar-brand" to="/"><i className="fas fa-door-open"></i>
      Open Door
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
      );
}

export default Nav;