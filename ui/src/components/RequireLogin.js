import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function RequireLogin(props) {
    const { user } = useAuth();
    return user ? props.children : <Navigate to={'/login'}/>;  
}