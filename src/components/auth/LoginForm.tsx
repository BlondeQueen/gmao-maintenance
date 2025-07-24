'use client';

import React, { useState } from 'react';
import { Mail, Lock, Building, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from './AuthContext';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email requis';
    if (!formData.password) newErrors.password = 'Mot de passe requis';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = await login(formData.email, formData.password);
    if (!success) {
      setErrors({ general: 'Email ou mot de passe incorrect' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header Dangote */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Building className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Dangote Cement Cameroon</h1>
          <h2 className="text-lg font-semibold text-red-600 mb-2">GMAO - Usine de Douala</h2>
          <p className="text-gray-600 text-sm">Système de Gestion de Maintenance</p>
          <p className="text-red-500 text-xs mt-1">Groupe Dangote Industries</p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <p className="text-red-700 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="exemple@entreprise.cm"
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-11 pr-11 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Votre mot de passe"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Demo Accounts Dangote */}
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-sm font-semibold text-red-700 mb-3 flex items-center">
            <Building className="w-4 h-4 mr-2" />
            Comptes Dangote Cement Cameroon
          </h3>
          <div className="space-y-2 text-xs text-gray-700">
            <div className="flex justify-between items-center py-1">
              <span className="font-medium">Administrateur:</span>
              <span className="font-mono">admin@dangote-cement.cm</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-medium">Chef Maintenance:</span>
              <span className="font-mono">maintenance@dangote-cement.cm</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-medium">Resp. Production:</span>
              <span className="font-mono">production@dangote-cement.cm</span>
            </div>
            <div className="text-center pt-2 border-t border-red-200">
              <span className="text-red-600 font-medium">Mot de passe démo: [role]123</span>
            </div>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Nouveau collaborateur Dangote ?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-1 mx-auto mt-2"
            >
              <UserPlus className="w-4 h-4" />
              Créer un compte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
