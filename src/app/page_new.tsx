'use client';

import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import EquipmentManagement from '../components/EquipmentManagement';

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'equipment':
        return <EquipmentManagement />;
      case 'maintenance':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Gestion de la Maintenance</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Module de gestion de la maintenance en cours de développement...</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">• Planification des interventions préventives</p>
                <p className="text-sm text-gray-500">• Suivi des ordres de travail</p>
                <p className="text-sm text-gray-500">• Historique des interventions</p>
                <p className="text-sm text-gray-500">• Gestion des techniciens</p>
              </div>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Planning de Maintenance</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Calendrier de maintenance en cours de développement...</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">• Vue calendaire des maintenances planifiées</p>
                <p className="text-sm text-gray-500">• Gestion des ressources</p>
                <p className="text-sm text-gray-500">• Notifications automatiques</p>
                <p className="text-sm text-gray-500">• Optimisation des plannings</p>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Analyses et Rapports</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Module d&apos;analyse en cours de développement...</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">• Analyses de tendances</p>
                <p className="text-sm text-gray-500">• Rapports de performance</p>
                <p className="text-sm text-gray-500">• Prédictions de pannes</p>
                <p className="text-sm text-gray-500">• Optimisation des coûts</p>
              </div>
            </div>
          </div>
        );
      case 'inventory':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Gestion des Stocks</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Module de gestion des stocks en cours de développement...</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">• Inventaire des pièces de rechange</p>
                <p className="text-sm text-gray-500">• Gestion des fournisseurs</p>
                <p className="text-sm text-gray-500">• Réapprovisionnement automatique</p>
                <p className="text-sm text-gray-500">• Traçabilité des mouvements</p>
              </div>
            </div>
          </div>
        );
      case 'alerts':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Centre d&apos;Alertes</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Centre d&apos;alertes en cours de développement...</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">• Gestion des alertes temps réel</p>
                <p className="text-sm text-gray-500">• Configuration des seuils</p>
                <p className="text-sm text-gray-500">• Escalade automatique</p>
                <p className="text-sm text-gray-500">• Historique des incidents</p>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
