import { useState, useEffect } from 'react';
import type { User } from '../types/User';

let currentUser: User | null = null;

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      try {
        currentUser = JSON.parse(stored);
        setUser(currentUser);
      } catch (e) {
        localStorage.removeItem('authUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (user: User) => {
    currentUser = user;
    localStorage.setItem('authUser', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    currentUser = null;
    localStorage.removeItem('authUser');
    setUser(null);
  };

  return { user, loading, login, logout };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authUser');
};