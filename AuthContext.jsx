import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, isAppwriteConfigured } from '../config/appwrite';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function checkSession() {
      try {
        const current = await authService.getCurrentUser();
        setUser(current);
      } catch (err) {
        console.error('Session check error:', err);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const loggedUser = await authService.login(email, password);
      setUser(loggedUser);
      showToast(`Welcome back, ${loggedUser.name}!`, 'success');
      return { success: true, user: loggedUser };
    } catch (err) {
      showToast(err.message || 'Authentication failed. Please verify credentials.', 'error');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const newUser = await authService.register(name, email, password);
      setUser(newUser);
      showToast('Account created successfully. Welcome to AURA SUBLIME!', 'success');
      return { success: true, user: newUser };
    } catch (err) {
      showToast(err.message || 'Registration failed.', 'error');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      showToast('Signed out successfully.', 'info');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        login,
        register,
        logout,
        isAppwriteConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
