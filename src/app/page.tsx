'use client';

import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import EquipmentManagement from '../components/EquipmentManagement';
import AlertCenter from '../components/AlertCenter';
import MaintenanceManagement from '../components/MaintenanceManagement';
import InventoryManagement from '../components/InventoryManagement';
import CalendarManagement from '../components/CalendarManagement';
import AnalyticsManagement from '../components/AnalyticsManagement';

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard');

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
