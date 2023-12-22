import LoginForm from './LoginForm';
import { useAuth } from '../../hooks/useAuth';
import Navigate from '../../components/Navigate';
import MainContainer from '../../components/MainContainer';

const Login = () => {
  const { user } = useAuth(); 
  
  return user ? <Navigate to='/apiaries' /> : (
    <MainContainer>
      <LoginForm />
    </MainContainer>
  )
}

export default Login;