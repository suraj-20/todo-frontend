import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import video from "../Components/Assets//168085 (Original).mp4";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

const LoginSignup = () => {
  const [state, setState] = useState("Login");

  const login = () => {
    console.log("User logged in.");
  };

  const signup = () => {
    console.log("User Siggned up.");
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          {state === "Sign Up" ? (
            <div className="footerDiv flex">
              <span className="text">Already have an account?</span>
              <Link to={""}>
                <button
                  className="btn"
                  onClick={() => {
                    setState("Login");
                  }}
                >
                  {" "}
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <div className="footerDiv flex">
              <span className="text">Don't have an account?</span>
              <Link to={""}>
                <button
                  className="btn"
                  onClick={() => {
                    setState("Sign Up");
                  }}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="formDiv flex">
          <div className="headerdiv">
            {state === "Sign Up" ? <h3>Let Us Know You!</h3> : <h3>Welcome Back!</h3>}
          </div>

          <form action="" className="form grid">
            {state === "Sign Up" ? (
              <></>
            ) : (
              <span className="showMessage">{state} Status will go here</span>
            )}

            {state === "Sign Up" ? (
              <div className="inputDiv">
                <label htmlFor="name">Name</label>
                <div className="input flex">
                  <FaUserShield className="icon" />
                  <input type="name" id="name" placeholder="Enter Your Name" />
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="inputDiv">
              <label htmlFor="name">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className="icon" />
                <input type="email" id="email" placeholder="Enter Your Email" />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Your Password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn flex"
              onClick={() => {
                state === "Login" ? login() : signup();
              }}
            >
              <span>{state}</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              Forgot your password? <Link to={""}>Click Here</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
