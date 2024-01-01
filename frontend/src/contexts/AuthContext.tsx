import { createContext } from 'react';
import { User } from '../models/user';

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthReady: boolean;
  setIsAuthReady: (authReady: boolean) => void;
};

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
  isAuthReady: false,
  setIsAuthReady: () => {}
});