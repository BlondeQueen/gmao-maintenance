'use client';

import React from 'react';
import { User, LogOut, Settings, Shield, Briefcase, MapPin } from 'lucide-react';
import { useAuth } from './AuthContext';

export default function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getRoleBadge = (role: string) => {
    const badges = {
      admin: { color: 'bg-red-100 text-red-800', icon: Shield, label: 'Administrateur' },
      manager: { color: 'bg-blue-100 text-blue-800', icon: Briefcase, label: 'Responsable' },
      technician: { color: 'bg-green-100 text-green-800', icon: Settings, label: 'Technicien' },
      operator: { color: 'bg-yellow-100 text-yellow-800', icon: User, label: 'Opérateur' }
    };
    return badges[role as keyof typeof badges] || badges.operator;
  };

  const badge = getRoleBadge(user.role);
  const IconComponent = badge.icon;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Profil Dangote Cement</h2>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>

      <div className="space-y-4">
        {/* Avatar & Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-red-600 text-sm font-medium">Dangote Cement Cameroon</p>
          </div>
        </div>

        {/* Role Badge */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
            <IconComponent className="w-4 h-4" />
            {badge.label}
          </span>
        </div>

        {/* Company & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <Briefcase className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm text-red-600">Entreprise</p>
              <p className="font-medium text-gray-900">{user.company}</p>
              <p className="text-xs text-red-500">Groupe Dangote Industries</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <MapPin className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm text-red-600">Site industriel</p>
              <p className="font-medium text-gray-900">{user.location}</p>
              <p className="text-xs text-red-500">Usine cimenterie - 1,5 MT/an</p>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Compte créé le</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            {user.lastLogin && (
              <div>
                <p className="text-gray-600">Dernière connexion</p>
                <p className="font-medium">
                  {new Date(user.lastLogin).toLocaleString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
