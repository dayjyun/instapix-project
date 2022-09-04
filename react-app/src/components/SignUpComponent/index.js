import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../store/session";

const SignUpUserForm = () => {
  const [errors, setErrors] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
};
