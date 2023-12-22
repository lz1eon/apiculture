import React from 'react';
import LoginForm from './LoginForm';
import { useAuth } from '../../hooks/useAuth';
// import Navigate from 'src/components/Navigate';
import MainContainer from '../../components/MainContainer';
import { IonLabel } from '@ionic/react';

const Login = () => {
  const { user } = useAuth(); 
  
  // return user ? <Navigate to='/apiaries' /> : (
  return (  
    <MainContainer>
      <LoginForm />
    </MainContainer>
  )
}

export default Login;