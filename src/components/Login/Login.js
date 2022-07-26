import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, LoginUserWithCredentials } = useAuth();
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [errorAPI, setErrorAPI] = useState("");

  useEffect(() => {
    auth.token && navigate("/");
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    setError({
      email: "",
      password: "",
    });
    let validation = true;

    if (!user.email) {
      setError((error) => ({ ...error, email: "Please Enter a valid email" }));
      validation = false;
    }
    if (!user.password) {
      setError((error) => ({
        ...error,
        password: "Please Enter a valid password",
      }));
      validation = false;
    }
    return validation;
  };
  
  const handleGuestLogin = async () => {
    const email = 'test@gmail.com';
    const password = 'test123';
    const guest = { email: email, password: password }
    const response = await LoginUserWithCredentials(
        guest,
        location.state?.from ? location.state.from : "/"
      );
      if (response.status !== 200) {
        setErrorAPI(response.response.data.error);
      }
  }

  const handleLogin = async () => {
    if (validateForm()) {
      const response = await LoginUserWithCredentials(
        user,
        location.state?.from ? location.state.from : "/"
      );
      if (response.status !== 200) {
        setErrorAPI(response.response.data.error);
      }
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Login</h1>
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
        <Button className="login__button" onClick={handleLogin}>
          LOGIN
        </Button>
        <Button className="login__button" onClick={handleGuestLogin}>
          Login as Guest
        </Button>
        {errorAPI && <small className="redText">*{errorAPI}</small>}
        <small className="login__createAcc">
          Don't have an account? <Link to="/signup">Create an account</Link>
        </small>
      </div>
    </div>
  );
};
