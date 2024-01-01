import LoginForm from './LoginForm';
import { useAuth } from '../../../hooks/useAuth';
import { Redirect } from 'react-router-dom';
import Page from '../../Page';

export const Login = () => {
  const { user } = useAuth(); 
  
  return user ? <Redirect to='/apiaries' /> : (
    <Page>
      <LoginForm />
    </Page>
  )
}