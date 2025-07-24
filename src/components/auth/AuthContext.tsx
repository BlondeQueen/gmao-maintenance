'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'technician' | 'manager' | 'operator';
  company: string;
  location: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: User['role'];
  company: string;
  location: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('gmao_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setState({
            user,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Récupérer les utilisateurs stockés
      const storedUsers = localStorage.getItem('gmao_users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      // Vérifier les identifiants
      const user = users.find(u => u.email === email);
      if (!user) {
        alert('Utilisateur non trouvé');
        setState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      // Simuler la vérification du mot de passe
      const storedPasswords = localStorage.getItem('gmao_passwords');
      const passwords: Record<string, string> = storedPasswords ? JSON.parse(storedPasswords) : {};
      
      if (passwords[user.id] !== password) {
        alert('Mot de passe incorrect');
        setState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      // Mettre à jour la dernière connexion
      const updatedUser = {
        ...user,
        lastLogin: new Date().toISOString()
      };

      // Sauvegarder l'utilisateur connecté
      localStorage.setItem('gmao_user', JSON.stringify(updatedUser));

      setState({
        user: updatedUser,
        isAuthenticated: true,
        isLoading: false
      });

      return true;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Récupérer les utilisateurs existants
      const storedUsers = localStorage.getItem('gmao_users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      // Vérifier si l'email existe déjà
      if (users.find(u => u.email === userData.email)) {
        alert('Un compte avec cet email existe déjà');
        setState(prev => ({ ...prev, isLoading: false }));
        return false;
      }

      // Créer le nouvel utilisateur
      const newUser: User = {
        id: `USER-${Date.now()}`,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        company: userData.company,
        location: userData.location,
        createdAt: new Date().toISOString()
      };

      // Sauvegarder l'utilisateur
      users.push(newUser);
      localStorage.setItem('gmao_users', JSON.stringify(users));

      // Sauvegarder le mot de passe séparément
      const storedPasswords = localStorage.getItem('gmao_passwords');
      const passwords: Record<string, string> = storedPasswords ? JSON.parse(storedPasswords) : {};
      passwords[newUser.id] = userData.password;
      localStorage.setItem('gmao_passwords', JSON.stringify(passwords));

      // Connecter automatiquement l'utilisateur
      localStorage.setItem('gmao_user', JSON.stringify(newUser));

      setState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });

      return true;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('gmao_user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!state.user) return false;

      const updatedUser = { ...state.user, ...userData };
      
      // Mettre à jour dans la liste des utilisateurs
      const storedUsers = localStorage.getItem('gmao_users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      const userIndex = users.findIndex(u => u.id === state.user!.id);
      
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('gmao_users', JSON.stringify(users));
      }

      // Mettre à jour l'utilisateur connecté
      localStorage.setItem('gmao_user', JSON.stringify(updatedUser));

      setState(prev => ({
        ...prev,
        user: updatedUser
      }));

      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      updateProfile
    }}>
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
