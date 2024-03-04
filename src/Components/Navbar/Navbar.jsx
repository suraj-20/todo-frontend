import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <div className="menu-icon" onClick={handleClick}>
          <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <Link to={"/"} className="navbar-logo">
          <p>Todo</p>
        </Link>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        <li
          onClick={() => {
            setMenu("home");
          }}
        >
          <Link to={"/"}>Home</Link>
          {menu === "home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("about");
          }}
        >
          <Link to={"/about"}>About</Link>
          {menu === "about" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login">
        {localStorage.getItem("Auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("Auth-token");
              window.location.replace("/")
            }}
          >Logout</button>
        ) : (
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
