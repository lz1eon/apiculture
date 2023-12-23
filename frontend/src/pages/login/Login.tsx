import LoginForm from './LoginForm';
import { useAuth } from '../../hooks/useAuth';
import { Redirect } from 'react-router-dom';
import { MainContainer } from '../../components';

export const Login = () => {
  const { user } = useAuth(); 
  
  return user ? <Redirect to='/apiaries' /> : (
    <MainContainer>
      <LoginForm />
    </MainContainer>
  )
}