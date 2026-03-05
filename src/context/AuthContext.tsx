import { createContext, type Dispatch } from 'react';
import type { TodosActions, TodoState, User } from '../types';

export interface IAuthContextType {
  user: User;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  register: (userName: string, password: string) => Promise<void>;
  loginUser: (userName: string, password: string) => Promise<void>;
  isLoading: boolean;
}
export const AuthContext = createContext<IAuthContextType | null>(null)
