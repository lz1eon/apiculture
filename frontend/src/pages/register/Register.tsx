import Navigate from '../../components/Navigate';
import RegisterForm from './RegisterForm';
import { useAuth } from '../../hooks/useAuth';
import MainContainer from '../../components/MainContainer';


const Register = () => {
  const { user } = useAuth();
  
  return user ? <Navigate to={'/apiaries'}/> : (
    <MainContainer>
      <RegisterForm />
    </MainContainer>
  )
}

export default Register;