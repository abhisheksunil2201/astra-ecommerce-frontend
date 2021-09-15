import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND } from "../backend";

const AuthContext = createContext();

const AuthReducer = (auth, { type, payload, value }) => {
  switch (type) {
    case "SET_TOKEN":
      return { ...auth, token: payload };
    case "SET_CURRENTUSER":
      return { ...auth, currentUser: payload };
    case "SET_USER":
      return { ...auth, user: { _id: payload } };
    case "RESET_USER":
      return { ...auth, user: {}, currentUser: "" };
    default:
      return auth;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useReducer(AuthReducer, {
    token: "",
    currentUser: "",
  });
  useEffect(() => {
    const userCredentials = JSON.parse(
      localStorage?.getItem("logincredentials")
    );
    userCredentials?.token &&
      setAuth({ type: "SET_TOKEN", payload: userCredentials.token });
    userCredentials?.userName &&
      setAuth({ type: "SET_CURRENTUSER", payload: userCredentials.userName });
    userCredentials?._id &&
      setAuth({ type: "SET_USER", payload: userCredentials._id });
  }, []);
  const navigate = useNavigate();

  const LoginUserWithCredentials = async (user, path) => {
    try {
      const response = await axios.post(`${BACKEND}/login`, user);
      if (response.status === 200) {
        localStorage.setItem(
          "logincredentials",
          JSON.stringify({
            token: response.data.token,
            userName: response.data.username,
          })
        );
        setAuth({ type: "SET_TOKEN", payload: response.data.token });
        setAuth({
          type: "SET_CURRENTUSER",
          payload: response.data.username,
        });

        navigate(path, { replace: path });
      }
      return response;
    } catch (err) {
      return err;
    }
  };
  const logoutHandler = (to) => {
    setAuth({ type: "SET_LOADING" });
    setTimeout(() => {
      localStorage?.removeItem("logincredentials");
      setAuth({
        type: "SET_TOKEN",
        payload: "",
      });
      setAuth({ type: "SET_LOADING" });
      navigate(to);
    }, 2000);
  };
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, LoginUserWithCredentials, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
