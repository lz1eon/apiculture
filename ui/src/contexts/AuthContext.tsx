import { createContext, useState } from 'react';
import { User } from '../models/user';

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
});