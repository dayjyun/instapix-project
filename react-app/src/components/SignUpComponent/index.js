import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { Redirect, Link } from "react-router-dom";
import "./SignUp.css";

const SignUpUserForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password));
    if (data) {
      setErrors(data);
    }
  };
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="signup-background">
      <div className="signup-form-container">
        <div className="logo-container">
          <h1 className="logo">Instapix</h1>
          <p>Sign up to see photos and videos from your friends.</p>
          <button className="signup-demo-user">
            <i class="fa-sharp fa-solid fa-user"></i> Log in as a demo user
          </button>
        </div>
        <div className="auth-separator">
          <span>OR</span>
        </div>
        <div id="signup-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <form className="signup-form" onSubmit={onSignUp}>
          <div className="signup-input-container">
            <label className="signup-label"></label>
            <input
              className="signup-input"
              placeholder="Username"
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className="signup-input-container">
            <label className="signup-label"></label>
            <input
              className="signup-input"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              placeholder="Email"
            ></input>
          </div>
          <div className="signup-input-container">
            <label className="signup-label"></label>
            <input
              className="signup-input"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              placeholder="Password"
            ></input>
          </div>
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div className="signup-form-container">
        <div className="login-link-container">
          <Link className="login-link" to="/login">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpUserForm;
