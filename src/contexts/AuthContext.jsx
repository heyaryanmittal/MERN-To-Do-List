import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      api.auth
        .getMe(storedToken)
        .then((response) => {
          setUser(response.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const signUp = async (email, password) => {
    try {
      const response = await api.auth.signup(email, password);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser(response.user);
      return { error: null };
    } catch (error) {
      return { error: { message: error.message } };
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await api.auth.login(email, password);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser(response.user);
      return { error: null };
    } catch (error) {
      return { error: { message: error.message } };
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    // Force a full page reload to reset the application state
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signUp, signIn, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
