import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export type PrivateRoutesProps = {
  children: any
};

export const PrivateRoutes: React.FC<PrivateRoutesProps> = ({children}) => {
  const { user, isAuthReady } = useAuth();

  return isAuthReady ? (user ? children : <Redirect to='/login' />) : ''
}