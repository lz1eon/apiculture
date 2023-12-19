import React from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function PrivateRoute(props) {
  const { user } = useAuth();
  console.log(user);
  return user ? props.children : <Navigate to={'/login'}/>;
}