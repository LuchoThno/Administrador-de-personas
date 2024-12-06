import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoginCredentials } from '../types/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const { login, logout, isAuthenticated, user } = useAuthStore();

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    try {
      // In a real app, this would make an API call
      const mockUser = {
        id: '1',
        email: credentials.email,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        isActive: true,
        department: 'Administration',
        position: 'System Administrator',
      };

      await login(mockUser);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al iniciar sesión',
      };
    }
  }, [login, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return {
    isAuthenticated,
    user,
    login: handleLogin,
    logout: handleLogout,
  };
};