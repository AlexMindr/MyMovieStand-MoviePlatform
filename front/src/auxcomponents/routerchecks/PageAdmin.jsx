import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PageAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  if (user && user.role === "admin") {
    return children;
  }

  return <Navigate to="/error" replace />;
};

export default PageAdmin;
