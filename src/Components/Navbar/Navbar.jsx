import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [clicked, setClicked] = useState(false);
  const navMenuRef = useRef(null);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleOutsideClick = (e) => {
    if (navMenuRef.current && !navMenuRef.current.contains(e.targer)) {
      setClicked(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {

  },[clicked]);

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

      <ul ref={navMenuRef} className={clicked ? "nav-menu active" : "nav-menu"}>
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
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
