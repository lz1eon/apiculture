import { useEffect } from 'react';
import { useUser } from './useUser';
import { User } from '../models/user';
import { useLocalStorage} from './useLocalStorage';

export const useAuth = () => {
    const { user, addUser, removeUser, isAuthReady, setIsAuthReady } = useUser();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem('user');
        if (user) {
            addUser(JSON.parse(user))
        }
        setIsAuthReady(true);
    }, []);

    const loginUser = (user: User) => {
        addUser(user);
    };

    const logoutUser = () => {
        removeUser();
    };

    return { user, loginUser, logoutUser, isAuthReady, setIsAuthReady };
}