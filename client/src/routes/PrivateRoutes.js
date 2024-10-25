import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../contexts/useUserAuth";

const PrivateRoutes = () => {
  const { loggedInUser } = useUserAuth();
  return loggedInUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
