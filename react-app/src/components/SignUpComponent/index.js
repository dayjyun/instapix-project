import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../store/session";

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
    <div className="signup-form-container">
      <div className="logo-container">
        <h1 className="logo">Instapix</h1>
      </div>
      <div id="signup-errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <form className="signup-form" onSubmit={onSignUp}>
        <div className="signup-input-container">
          <label className="signup-label">Username</label>
          <input
            className="signup-input"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="signup-input-container">
          <label className="signup-label">Email</label>
          <input
            className="signup-input"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
          <div className="signup-input-container">
            <label className="signup-label">Password</label>
            <input
                className="signup-input"
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
            ></input>
        </div>
      </form>
    </div>
  );
};
