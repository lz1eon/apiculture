import { Redirect } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { useAuth } from '../../hooks/useAuth';
import { MainContainer } from '../../components';


export const Register = () => {
  const { user } = useAuth();
  
  return user ? <Redirect to={'/apiaries'}/> : (
    <MainContainer>
      <RegisterForm />
    </MainContainer>
  )
};