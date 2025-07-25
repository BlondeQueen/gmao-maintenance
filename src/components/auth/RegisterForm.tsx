'use client';

import React, { useState } from 'react';
import { User, Mail, Lock, Building, MapPin, Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';
import { useAuth } from './AuthContext';
import DangoteLogo from '../DangoteLogo';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const cameroonCities = [
  'Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Garoua', 'Maroua', 'Ngaoundéré', 
  'Bertoua', 'Kribi', 'Edéa', 'Kumba', 'Ebolowa', 'Sangmélima', 'Loum'
];

const roles = [
  { value: 'admin', label: 'Administrateur', description: 'Accès complet au système' },
  { value: 'manager', label: 'Responsable', description: 'Gestion des équipes et rapports' },
  { value: 'technician', label: 'Technicien', description: 'Interventions et maintenance' },
  { value: 'operator', label: 'Opérateur', description: 'Surveillance et exploitation' }
];

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    location: '',
    role: 'technician' as const
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nom complet requis';
    if (!formData.email.trim()) newErrors.email = 'Email requis';
    if (!formData.email.includes('@')) newErrors.email = 'Format email invalide';
    if (!formData.password) newErrors.password = 'Mot de passe requis';
    if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    if (!formData.company.trim()) newErrors.company = 'Entreprise requise';
    if (!formData.location) newErrors.location = 'Localisation requise';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = await register({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      company: formData.company.trim(),
      location: formData.location,
      role: formData.role
    });

    if (!success) {
      setErrors({ general: 'Erreur lors de la création du compte' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        {/* Header Dangote */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <DangoteLogo size="lg" showText={false} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Dangote Cement Cameroon</h1>
          <h2 className="text-lg font-semibold text-red-600 mb-2">Nouveau Collaborateur</h2>
          <p className="text-gray-600 text-sm">Créer votre accès GMAO Douala</p>
          <p className="text-red-500 text-xs mt-1">Groupe Dangote Industries</p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <p className="text-red-700 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Jean Dupont"
                disabled={isLoading}
              />
            </div>
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email professionnelle
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="prenom.nom@dangote-cement.cm"
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Entreprise
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="company"
                name="company"
                value="Dangote Cement Cameroon"
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 ${
                  errors.company ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Dangote Cement Cameroon"
                readOnly
                disabled={isLoading}
              />
            </div>
            {errors.company && <p className="text-red-600 text-sm mt-1">{errors.company}</p>}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Localisation
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.location ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isLoading}
              >
                <option value="">Sélectionner une ville</option>
                {cameroonCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Rôle dans l&apos;entreprise
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isLoading}
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label} - {role.description}
                </option>
              ))}
            </select>
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
                className={`w-full pl-11 pr-11 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Minimum 6 caractères"
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-11 pr-11 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Confirmer votre mot de passe"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
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
              <UserPlus className="w-5 h-5" />
            )}
            {isLoading ? 'Création...' : 'Rejoindre Dangote Cement'}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Déjà collaborateur Dangote ?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-1 mx-auto mt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
