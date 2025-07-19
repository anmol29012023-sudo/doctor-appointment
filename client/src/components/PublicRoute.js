import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const user = localStorage.getItem('token'); 

  if (user) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default PublicRoute;
