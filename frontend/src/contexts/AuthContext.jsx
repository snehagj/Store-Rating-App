import React, { createContext, useState, useEffect } from 'react';
import API from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (credentials) => {
    const res = await API.post('/auth/login', credentials);
    const { token, user: u } = res.data;
    localStorage.setItem('token', token);
    setUser(u);
    return u;
  };

  const signup = async (payload) => {
    const res = await API.post('/auth/signup', payload);
    const { token, user: u } = res.data;
    localStorage.setItem('token', token);
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, setUser, login, logout, signup }}>{children}</AuthContext.Provider>;
};
