import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../store/session";

import "./SignUp.css";

const SignUpUserForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"))
      .then(() => {
        reset();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
        }
      });
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      signUp(username, email, password, firstName, lastName, profileImage)
    );
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

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };
  const updateProfileImage = (e) => {
    setProfileImage(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="signup-page">
      <div className="signup-background">
        <div className="signup-form-container">
          <div className="logo-container">
            <h1 className="logo">Instapix</h1>
            <p>Sign up to see photos and videos from your friends.</p>
            <button onClick={handleGuestLogin} className="signup-demo-user">
              <i className="fa-sharp fa-solid fa-user"></i> Log in as a demo user
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
                placeholder="First Name"
                type="text"
                name="firstName"
                onChange={updateFirstName}
                value={firstName}
              ></input>
            </div>

            <div className="signup-input-container">
              <label className="signup-label"></label>
              <input
                className="signup-input"
                placeholder="Last Name"
                type="text"
                name="lastName"
                onChange={updateLastName}
                value={lastName}
              ></input>
            </div>

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
            <div className="signup-input-container">
              <label className="signup-label"></label>
              <input
                className="signup-input"
                type="text"
                name="profileImage"
                onChange={updateProfileImage}
                value={profileImage}
                placeholder="Upload Profile Image"
              ></input>
            </div>
            <button className="signup-button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <div className="signup-form-container">
          <div className="login-link-container">
            <p>
              Have an account?{" "}
              <Link className="login-link" to="/login">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpUserForm;
