import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export type PrivateRouteProps = {} & RouteProps;

export const PrivateRoute: React.FC<PrivateRouteProps> = (props)  => {
  const { user } = useAuth();
  
  // if (!user) {
  //   const router = document.querySelector('ion-router');
  //   const routeRedirect = document.createElement('ion-route-redirect');
  //   routeRedirect.setAttribute('from', '*');
  //   routeRedirect.setAttribute('to', '/login');  
  //   router.appendChild(routeRedirect);
  //   return <></>;
  // } else {
  //   return <Route {...props} />
  // }
  

  return user ? <Route {...props} /> : <Redirect to='/login' /> 
};