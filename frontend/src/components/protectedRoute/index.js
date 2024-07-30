import React from 'react';
import { Navigate } from 'react-router-dom';

// Replace this with your actual authentication check
const isAuthenticated = () => {
  // For example, check if a token exists in localStorage
  return localStorage.getItem('token') !== null;
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/auth" />;
};

export default ProtectedRoute;
