import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserAuth } from '../contexts/useUserAuth';

const PublicRoutes = () => {
  const { loggedInUser } = useUserAuth();
  return loggedInUser ? <Navigate to='/goal-page' replace /> : <Outlet />;
};

export default PublicRoutes;