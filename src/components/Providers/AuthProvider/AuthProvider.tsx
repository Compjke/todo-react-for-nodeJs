import { jwtDecode } from 'jwt-decode';
import { type ReactNode, useContext, useEffect, useState } from 'react';
import { authApi } from '../../../api/authApi';
import {
  AuthContext,
  type IAuthContextType,
} from '../../../context/AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IAuthContextType['user']>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<{
          id: string;
          userName: string;
          exp: number;
        }>(storedToken);

        if (decoded.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setUser({ id: decoded.id, userName: decoded.userName });
        } else {
          localStorage.removeItem('token');
        }
      } catch {
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    const decoded = jwtDecode<{ id: string; userName: string }>(newToken);
    setToken(newToken);
    setUser({ id: decoded.id, userName: decoded.userName });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const register = async (userName: string, password: string) => {
    setIsLoading(true);
    try {
      await authApi.register(userName, password);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (userName: string, password: string) => {
    setIsLoading(true);
    const { data } = await authApi.login(userName, password);
    login(data.token);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, register, loginUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
