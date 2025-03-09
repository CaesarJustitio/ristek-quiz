import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../images/logo.png";


const Navbar = () => {
  return (
    <nav>
        <img src={logo} className="App-logo" alt="logo" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/tryouts">Tryout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
