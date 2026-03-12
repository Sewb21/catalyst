import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { useValidateUser } from '@/lib/hooks/data/useValidateUser';
import { useLogin } from '@/lib/hooks/data/useLogin';

interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthContext {
  isAuthenticated: boolean;
  user: User | null;
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
  isLoggingIn: boolean;
  loginError: string | null;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const { data: userData, isLoading: isLoadingUser } = useValidateUser(token);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) setToken(localToken);
    setIsLoading(false);
  }, []);

  const saveToken = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    window.location.replace('/login?redirect=' + window.location.pathname);
  };

  useEffect(() => {
    if (userData === undefined) return;
    if (userData?.valid) {
      setIsAuthenticated(true);
      setUser(userData.payload);
    } else {
      logout();
    }
  }, [userData]);

  const {
    mutate: login,
    isPending: isLoggingIn,
    error: loginMutationError,
  } = useLogin({ onSuccess: saveToken });

  const loginError = loginMutationError ? loginMutationError.message : null;

  if (isLoadingUser || isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoggingIn, loginError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
