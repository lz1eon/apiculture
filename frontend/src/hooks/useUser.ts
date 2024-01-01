import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../models/user';

export const useUser = () => {
    const { user, setUser, isAuthReady, setIsAuthReady } = useContext(AuthContext);
    const { setItem } = useLocalStorage();

    const addUser = (user: User) => {
        setUser(user);
        setItem("user", JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        setItem('user', '');
    };

    return { user, addUser, removeUser, isAuthReady, setIsAuthReady };
}
