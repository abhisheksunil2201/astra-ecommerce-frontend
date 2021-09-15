import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const AuthRoute = ({ path, ...props }) => {
  const { auth } = useAuth();
  return auth.token ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
