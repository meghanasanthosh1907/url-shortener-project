import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-brand">URL Shortener</Link>
      <div className="nav-links">
        <Link to="/login">Logout</Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
