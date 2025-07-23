'use client';

import React from 'react';
import { 
  Home, 
  Settings, 
  AlertTriangle, 
  Calendar, 
  BarChart3, 
  Package, 
  Wrench,
  Gauge,
  Bell
} from 'lucide-react';

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
];

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <nav className="bg-blue-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <div className="flex items-center space-x-3">
          <Gauge className="h-8 w-8 text-blue-300" />
          <div>
            <h1 className="text-xl font-bold">GMAO</h1>
            <p className="text-blue-300 text-sm">Industrie Cameroun</p>
          </div>
        </div>
      </div>

      <ul className="space-y-2">
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
          <p className="font-medium">Usine de Transformation</p>
          <p>Site de Douala - Cameroun</p>
        </div>
      </div>
    </nav>
  );
}
