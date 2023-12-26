import { Redirect } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { useAuth } from '../../hooks/useAuth';
import Page from '../Page';


export const Register = () => {
  const { user } = useAuth();
  
  return user ? <Redirect to={'/apiaries'}/> : (
    <Page>
      <RegisterForm />
    </Page>
  )
};