import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Route, Navigate } from 'react-router-dom';

//route available only when user is logged in
export default function ProtectedRoute({ children }: any) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to='/login' />;
}
