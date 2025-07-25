'use client';

import React, { useState } from 'react';
import { 
  Home, 
  Settings, 
  AlertTriangle, 
  Calendar, 
  BarChart3, 
  Package, 
  Wrench,
  Gauge,
  Bell,
  Menu,
  X,
  User
} from 'lucide-react';
import { useAuth } from './auth/AuthContext';
import DangoteLogo from './DangoteLogo';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Tableau de Bord', icon: Home },
  { id: 'equipment', label: 'Équipements', icon: Settings },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'calendar', label: 'Planning', icon: Calendar },
  { id: 'analytics', label: 'Analyses', icon: BarChart3 },
  { id: 'inventory', label: 'Stock', icon: Package },
  { id: 'alerts', label: 'Alertes', icon: AlertTriangle },
  { id: 'profile', label: 'Profil', icon: User },
];

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    setIsMenuOpen(false); // Ferme le menu mobile après sélection
  };

  return (
    <>
      {/* Navigation Desktop */}
      <nav className="hidden lg:flex bg-blue-900 text-white w-64 min-h-screen p-4 flex-col">
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <DangoteLogo size="md" showText={false} />
            <div>
              <h1 className="text-xl font-bold">GMAO</h1>
              <p className="text-blue-300 text-sm">Dangote Cement Cameroon</p>
              <p className="text-blue-400 text-xs">Usine de Douala</p>
            </div>
          </div>
        </div>

        <ul className="space-y-2 flex-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-700 text-white' 
                      : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.id === 'alerts' && (
                    <div className="ml-auto">
                      <Bell className="h-4 w-4 text-red-400" />
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 pt-8 border-t border-blue-700">
          <div className="text-blue-300 text-sm">
            {user ? (
              <>
                <p className="font-medium">{user.name}</p>
                <p className="capitalize">{user.role} - {user.company}</p>
                <p>{user.location}, Cameroun</p>
              </>
            ) : (
              <>
                <p className="font-medium">Usine de Transformation</p>
                <p>Site de Douala - Cameroun</p>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Header Mobile */}
      <div className="lg:hidden bg-blue-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Gauge className="h-6 w-6 text-blue-300" />
          <div>
            <h1 className="text-lg font-bold">GMAO</h1>
            <p className="text-blue-300 text-xs">Dangote Cement</p>
          </div>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg hover:bg-blue-800 transition-colors"
          aria-label="Ouvrir le menu de navigation"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Navigation Mobile - Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="bg-blue-900 text-white w-64 h-full p-4 transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Gauge className="h-8 w-8 text-blue-300" />
                  <div>
                    <h1 className="text-xl font-bold">GMAO</h1>
                    <p className="text-blue-300 text-sm">Industrie Cameroun</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded hover:bg-blue-800"
                  aria-label="Fermer le menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-700 text-white' 
                          : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {item.id === 'alerts' && (
                        <div className="ml-auto">
                          <Bell className="h-4 w-4 text-red-400" />
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 pt-8 border-t border-blue-700">
              <div className="text-blue-300 text-sm">
                {user ? (
                  <>
                    <p className="font-medium">{user.name}</p>
                    <p className="capitalize">{user.role} - {user.company}</p>
                    <p>{user.location}, Cameroun</p>
                  </>
                ) : (
                  <>
                    <p className="font-medium">Usine de Transformation</p>
                    <p>Site de Douala - Cameroun</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
