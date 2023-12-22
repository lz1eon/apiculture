import React from 'react';
import Navigate from 'src/components/Navigate';
import logo from 'src/assets/images/bee.jpg';
// import RegisterForm from './RegisterForm';
import { useAuth } from 'src/hooks/useAuth';
import MainContainer from 'src/components/MainContainer';

const Register = () => {
  const { user } = useAuth();
  
  return user ? <Navigate to={'/apiaries'}/> : (
    <MainContainer>
      {/* <RegisterForm /> */}
      <img src={logo} className="App-logo" alt="logo" />
    </MainContainer>
  )
}

export default Register;