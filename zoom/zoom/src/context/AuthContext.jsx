/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('neon_user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('neon_token'));

  useEffect(() => {
    // Persistent sessions enabled. No longer clearing tokens on refresh.
  }, []);

  const login = (userData, authToken) => {
    // Set both together to minimize re-renders and race conditions
    localStorage.setItem('neon_user', JSON.stringify(userData));
    localStorage.setItem('neon_token', authToken);
    setUser(userData);
    setToken(authToken);
  };

  const updateUser = (userData) => {
    localStorage.setItem('neon_user', JSON.stringify(userData));
    setUser(userData);
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem('neon_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('neon_user');
    localStorage.removeItem('neon_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, updateUser, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
