import { Outlet, Link } from "react-router-dom";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LoggedInContext } from "../../App";
import { handleLogin } from "./handleRequest";

import "./signUp.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);

  const [newUser, setNewUser] = useState(false);
  const [inputTypeOfPassword, setInputTypeOfPassword] = useState("password");

  const changeForm = () => {
    setNewUser(!newUser);
  };

  const showHidePassword = (e) => {
    let passwordField = document.getElementById("password");

    if (passwordField.type == "password") {
      setInputTypeOfPassword("text");
    } else if (passwordField.type == "text") {
      setInputTypeOfPassword("password");
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <picture>
          <img src="dashboard-logo.svg" alt="Dashboard Kit" />
        </picture>
        <p className="subtitle">Dashboard Kit</p>
        <div className="title">
          <p>{newUser ? "Sign up" : "Log in"} to Dashboard Kit</p>
        </div>
        <p className="instruction">Enter your email and password below </p>
        <form action="" id="portal-form">
          {newUser && (
            <div className="input_group">
              <label htmlFor="full-name">Full Name</label>
              <input
                type="text"
                id="full-name"
                placeholder="Full Name"
                name="fullName"
              />
            </div>
          )}

          <div className="input_group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email address"
              name="email"
            />
          </div>

          <div className="input_group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={inputTypeOfPassword}
                id="password"
                placeholder="Password"
                name="password"
              />
              <div className="eye-icon" onClick={showHidePassword}>
                {inputTypeOfPassword == "password" && <IoMdEyeOff />}
                {inputTypeOfPassword == "text" && <IoMdEye />}
              </div>
            </div>
          </div>

          {newUser && (
            <div className="input_group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={inputTypeOfPassword}
                  id="confirm-password"
                  placeholder="Password"
                  name="confirmPassword"
                />
                <div className="eye-icon" onClick={showHidePassword}>
                  {inputTypeOfPassword == "password" && <IoMdEyeOff />}
                  {inputTypeOfPassword == "text" && <IoMdEye />}
                </div>
              </div>
            </div>
          )}

          <button
            id="login-button"
            type="button"
            onClick={() => handleLogin(navigate, isLoggedIn, setIsLoggedIn)}
          >
            {newUser ? "SignUp" : "Login"}
          </button>
        </form>
        <p className="change-form">
          {newUser ? "Already have an account? " : "Don't have an account? "}
          <span onClick={changeForm}>{newUser ? "Log in" : "Sign Up"}</span>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
