import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      document.documentElement.setAttribute('data-theme', parsedUser.theme || 'light');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      document.documentElement.setAttribute('data-theme', userData.theme || 'light');
      return userData;
    }
  };

  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    if (response.data.success) {
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      document.documentElement.setAttribute('data-theme', userData.theme || 'light');
      return userData;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    document.documentElement.setAttribute('data-theme', 'light');
  };

  const updateTheme = async (theme) => {
    const response = await api.put('/auth/profile', { theme });
    if (response.data.success) {
      const updatedUser = { ...user, theme };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      document.documentElement.setAttribute('data-theme', theme);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateTheme, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
