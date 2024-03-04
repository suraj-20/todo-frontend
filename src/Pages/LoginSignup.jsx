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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    console.log("User signed in", formData);
    try {
      let responseData;
      await fetch(`http://localhost:5000/api/v1/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => (responseData = data))
        .catch((error) => console.log(error));

      if (responseData.success) {
        window.location.replace("/login");
        console.log("User created");
      } else {
        alert(responseData.error);
      }
    } catch (error) {
      console.error("Error in user signed in.", error);
    }
  };

  const login = async () => {
    console.log("User signed in", formData);

    let responseData;
    await fetch(`http://localhost:5000/api/v1/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        (responseData = data); console.log(data);
      })
      .catch((error) => console.error("Error in logged in", error));

    if (responseData.success) {
      localStorage.setItem("Auth-token", responseData.token);
      window.location.replace("/");
      console.log("User logged in");
    } else {
      alert(responseData.error);
    }
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
            {state === "Sign Up" ? (
              <h3>Let Us Know You!</h3>
            ) : (
              <h3>Welcome Back!</h3>
            )}
          </div>

          <form
            action=""
            className="form signupForm grid"
            onSubmit={(e) => {
              e.preventDefault();
              state === "Login" ? login() : signup();
            }}
            encType="multipart/form-data"
          >
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
                  <input
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your Name"
                    required
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="inputDiv">
              <label htmlFor="name">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className="icon" />
                <input
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
            </div>

            {/* {state === "Sign Up" ? (
              <div className="inputDiv checkboxInput flex">
                <div className="form-check flex">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="USER"
                    onChange={handleChange}
                    name="role"
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    USER
                  </label>
                </div>
                <div className="form-check flex">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="ADMIN"
                    onChange={handleChange}
                    name="role"
                    id="flexCheckChecked"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    ADMIN
                  </label>
                </div>
              </div>
            ) : (
              <></>
            )} */}

            <button type="submit" className="btn flex">
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
