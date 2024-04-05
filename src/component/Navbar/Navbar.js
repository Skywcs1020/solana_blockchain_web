import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 style={{ color: "white" }}>Dchain</h2>
      </Link>
    </header>
  );
}

export default Navbar;
