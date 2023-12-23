import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export type PrivateRouteProps = {} & RouteProps;

export const PrivateRoute: React.FC<PrivateRouteProps> = (props)  => {
  const { user } = useAuth();

  return user ? <Route {...props} /> : <Redirect to='/login' /> 
};