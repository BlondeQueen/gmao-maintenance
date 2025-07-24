'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import EquipmentManagement from '../components/EquipmentManagement';
import AlertCenter from '../components/AlertCenter';
import MaintenanceManagement from '../components/MaintenanceManagement';
import InventoryManagement from '../components/InventoryManagement';
import CalendarManagement from '../components/CalendarManagement';
import AnalyticsManagement from '../components/AnalyticsManagement';
import AuthPage from '../components/auth/AuthPage';
import UserProfile from '../components/auth/UserProfile';
import { useAuth } from '../components/auth/AuthContext';
import { initializeDemoData } from '../data/demoAuth';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Initialiser les données de démonstration au premier chargement
  useEffect(() => {
    initializeDemoData();
  }, []);

  // Afficher le loading pendant la vérification d'auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Afficher la page d'authentification si pas connecté
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'equipment':
        return <EquipmentManagement />;
      case 'maintenance':
        return <MaintenanceManagement />;
      case 'alerts':
        return <AlertCenter />;
      case 'inventory':
        return <InventoryManagement />;
      case 'calendar':
        return <CalendarManagement />;
      case 'analytics':
        return <AnalyticsManagement />;
      case 'profile':
        return <UserProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="flex-1 overflow-auto">
        <div className="lg:hidden h-4"></div> {/* Espace pour le header mobile */}
        {renderContent()}
      </main>
    </div>
  );
}
