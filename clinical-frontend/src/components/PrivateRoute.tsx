import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode; // <-- schimbat de la JSX.Element
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
