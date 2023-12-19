import React from 'react';
import { Typography } from '@mui/material';
import logo from '../home/bee.jpg';
import LoginForm from './LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export const Login = () => {
  const { user } = useAuth();
  
  return user ? <Navigate to={'/apiaries'}/> : (
      <div
        className={
          'flex items-center justify-center flex-col min-h-screen dark:bg-gray-800 dark:text-gray-100 transition-all'
      }>

      <Typography variant="h2" component="h2">Пчелинът</Typography>
      <LoginForm />
      <img src={logo} className="App-logo" alt="logo" />
    
    </div>
  )
}
