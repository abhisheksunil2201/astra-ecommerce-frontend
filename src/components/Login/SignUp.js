import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { BACKEND } from "../../backend";

export const SignUp = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [errorAPI, setErrorAPI] = useState("");

  useEffect(() => {
    auth.token && navigate("/");
  });

  const isValidEmail = (email) => {
    const emailRegex = new RegExp("[a-z][0-9]*@gmail.com");
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = new RegExp("[0-9]+");
    return password.length > 6 && passwordRegex.test(password);
  };

  const validateForm = () => {
    setError({ firstName: "", email: "", password: "" });
    let validation = true;
    if (!user.firstName) {
      setError((error) => ({
        ...error,
        firstName: "Please Enter a valid name",
      }));
      validation = false;
    }
    if (!user.email || !isValidEmail(user.email)) {
      setError((error) => ({ ...error, email: "Please Enter a valid email" }));
      validation = false;
    }
    if (!user.password || !isValidPassword(user.password)) {
      setError((error) => ({
        ...error,
        password: "Please Enter a valid password",
      }));
      validation = false;
    }
    return validation;
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (from) => {
    setErrorAPI("");
    if (validateForm()) {
      const response = await axios.post(`${BACKEND}/signup`, user);
      if (response.status === 200) {
        setAuth({ type: "SET_TOKEN", payload: response.data.token });
        setAuth({
          type: "SET_CURRENTUSER",
          payload: response.data.username,
        });
        localStorage.setItem(
          "logincredentials",
          JSON.stringify({
            token: response.data.token,
            userName: response.data.username,
          })
        );
        navigate(from, { replace: true });
      } else {
        setErrorAPI("User already exists");
      }
    }
  };
  return (
    <div className="signup">
      <div className="login__container">
        <h1>Sign Up</h1>
        <input
          type="text"
          className="login__input"
          placeholder="First Name"
          value={user.firstName}
          name="firstName"
          onChange={handleChange}
        />
        {error.firstName && (
          <small className="redText">*{error.firstName}</small>
        )}
        <input
          type="text"
          className="login__input"
          placeholder="Last Name"
          value={user.lastName}
          name="lastName"
          onChange={handleChange}
        />
        <input
          type="text"
          className="login__input"
          placeholder="email"
          value={user.email}
          name="email"
          onChange={handleChange}
        />
        {error.email && <small className="redText">*{error.email}</small>}
        <input
          type="password"
          className="login__input"
          placeholder="password"
          value={user.password}
          name="password"
          onChange={handleChange}
        />
        {error.password && <small className="redText">*{error.password}</small>}
        <Button
          className="login__button"
          onClick={() =>
            handleSignUp(location.state?.from ? location.state.from : "/")
          }
        >
          SIGN UP
        </Button>
        {errorAPI && <small className="redText">*{errorAPI}</small>}
      </div>
    </div>
  );
};
