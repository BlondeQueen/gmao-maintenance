'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Calendar,
  Filter,
  Search,
  Bell,
  XCircle,
  Info,
  Zap,
  AlertCircle
} from 'lucide-react';
import { mockAlerts } from '../data/mockData';
import { Alert, AlertSeverity, AlertType } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function AlertCenter() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filterSeverity, setFilterSeverity] = useState<AlertSeverity | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrage des alertes
  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'ALL' || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === 'ALL' || 
                         (filterStatus === 'ACTIVE' && !alert.acknowledged && !alert.resolved) ||
                         (filterStatus === 'ACKNOWLEDGED' && alert.acknowledged && !alert.resolved) ||
                         (filterStatus === 'RESOLVED' && alert.resolved);
    const matchesSearch = alert.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  // Statistiques des alertes
  const alertStats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'CRITICAL').length,
    high: alerts.filter(a => a.severity === 'HIGH').length,
    medium: alerts.filter(a => a.severity === 'MEDIUM').length,
    low: alerts.filter(a => a.severity === 'LOW').length,
    active: alerts.filter(a => !a.acknowledged && !a.resolved).length,
    acknowledged: alerts.filter(a => a.acknowledged && !a.resolved).length,
    resolved: alerts.filter(a => a.resolved).length
  };

  const getSeverityInfo = (severity: AlertSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return { icon: AlertTriangle, color: 'text-red-600 bg-red-100 border-red-200', label: 'Critique' };
      case 'HIGH':
        return { icon: AlertCircle, color: 'text-orange-600 bg-orange-100 border-orange-200', label: 'Élevé' };
      case 'MEDIUM':
        return { icon: Info, color: 'text-yellow-600 bg-yellow-100 border-yellow-200', label: 'Moyen' };
      case 'LOW':
        return { icon: Info, color: 'text-blue-600 bg-blue-100 border-blue-200', label: 'Faible' };
      default:
        return { icon: Info, color: 'text-gray-600 bg-gray-100 border-gray-200', label: 'Inconnu' };
    }
  };

  const getTypeInfo = (type: AlertType) => {
    switch (type) {
      case 'SENSOR_THRESHOLD':
        return { icon: Zap, label: 'Seuil Capteur' };
      case 'MAINTENANCE_DUE':
        return { icon: Calendar, label: 'Maintenance Due' };
      case 'EQUIPMENT_FAILURE':
        return { icon: XCircle, label: 'Panne Équipement' };
      case 'LOW_STOCK':
        return { icon: AlertTriangle, label: 'Stock Faible' };
      case 'SYSTEM_ERROR':
        return { icon: AlertCircle, label: 'Erreur Système' };
      default:
        return { icon: Info, label: 'Autre' };
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? {
            ...alert,
            acknowledged: true,
            acknowledgedBy: 'Mamadou Diallo',
            acknowledgedAt: new Date()
          }
        : alert
    ));
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? {
            ...alert,
            resolved: true,
            resolvedBy: 'Mamadou Diallo',
            resolvedAt: new Date()
          }
        : alert
    ));
  };

  const StatCard = ({ title, value, color, icon: Icon }: { 
    title: string; 
    value: number; 
    color: string; 
    icon: React.ComponentType<{ className?: string }>; 
  }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`p-2 rounded-full ${color === 'text-red-600' ? 'bg-red-100' : 
                                           color === 'text-orange-600' ? 'bg-orange-100' :
                                           color === 'text-yellow-600' ? 'bg-yellow-100' :
                                           color === 'text-blue-600' ? 'bg-blue-100' : 'bg-gray-100'}`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </div>
    </div>
  );

  const AlertCard = ({ alert }: { alert: Alert }) => {
    const severityInfo = getSeverityInfo(alert.severity);
    const typeInfo = getTypeInfo(alert.type);
    const SeverityIcon = severityInfo.icon;
    const TypeIcon = typeInfo.icon;

    return (
      <div className={`bg-white rounded-lg shadow-md border-l-4 p-4 ${
        alert.severity === 'CRITICAL' ? 'border-red-500' :
        alert.severity === 'HIGH' ? 'border-orange-500' :
        alert.severity === 'MEDIUM' ? 'border-yellow-500' : 'border-blue-500'
      }`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <SeverityIcon className={`h-5 w-5 ${severityInfo.color.split(' ')[0]}`} />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityInfo.color}`}>
              {severityInfo.label}
            </span>
            <span className="text-gray-500 text-xs flex items-center">
              <TypeIcon className="h-3 w-3 mr-1" />
              {typeInfo.label}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {format(alert.timestamp, 'dd/MM/yyyy HH:mm', { locale: fr })}
          </div>
        </div>

        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 mb-1">{alert.equipmentName}</h3>
          <p className="text-gray-700 text-sm">{alert.message}</p>
        </div>

        {alert.sensorId && alert.value && alert.threshold && (
          <div className="bg-gray-50 rounded p-2 mb-3 text-xs">
            <span className="text-gray-600">Valeur mesurée: </span>
            <span className="font-medium">{alert.value.toFixed(1)}</span>
            <span className="text-gray-600"> / Seuil: </span>
            <span className="font-medium">{alert.threshold}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            {alert.acknowledged && (
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                <span>Acquittée par {alert.acknowledgedBy}</span>
              </div>
            )}
            {alert.resolved && (
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1 text-blue-500" />
                <span>Résolue par {alert.resolvedBy}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            {!alert.acknowledged && !alert.resolved && (
              <button
                onClick={() => acknowledgeAlert(alert.id)}
                className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 transition-colors"
              >
                Acquitter
              </button>
            )}
            {alert.acknowledged && !alert.resolved && (
              <button
                onClick={() => resolveAlert(alert.id)}
                className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
              >
                Résoudre
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Centre d&apos;Alertes</h1>
        <p className="text-gray-600">
          Gestion centralisée des alertes et notifications du système GMAO
        </p>
      </div>

      {/* Statistiques des alertes */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        <StatCard title="Total" value={alertStats.total} color="text-gray-600" icon={Bell} />
        <StatCard title="Critiques" value={alertStats.critical} color="text-red-600" icon={AlertTriangle} />
        <StatCard title="Élevées" value={alertStats.high} color="text-orange-600" icon={AlertCircle} />
        <StatCard title="Moyennes" value={alertStats.medium} color="text-yellow-600" icon={Info} />
        <StatCard title="Actives" value={alertStats.active} color="text-red-600" icon={Zap} />
        <StatCard title="Acquittées" value={alertStats.acknowledged} color="text-yellow-600" icon={Clock} />
        <StatCard title="Résolues" value={alertStats.resolved} color="text-green-600" icon={CheckCircle} />
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="alert-search" className="block text-sm font-medium text-gray-700 mb-1">
              <Search className="inline h-4 w-4 mr-1" />
              Rechercher
            </label>
            <input
              id="alert-search"
              type="text"
              placeholder="Équipement ou message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="alert-severity-filter" className="block text-sm font-medium text-gray-700 mb-1">
              <Filter className="inline h-4 w-4 mr-1" />
              Sévérité
            </label>
            <select
              id="alert-severity-filter"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as AlertSeverity | 'ALL')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filtrer par sévérité"
            >
              <option value="ALL">Toutes les sévérités</option>
              <option value="CRITICAL">Critique</option>
              <option value="HIGH">Élevé</option>
              <option value="MEDIUM">Moyen</option>
              <option value="LOW">Faible</option>
            </select>
          </div>
          <div>
            <label htmlFor="alert-status-filter" className="block text-sm font-medium text-gray-700 mb-1">
              <Filter className="inline h-4 w-4 mr-1" />
              Statut
            </label>
            <select
              id="alert-status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'ALL' | 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filtrer par statut"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="ACTIVE">Actives</option>
              <option value="ACKNOWLEDGED">Acquittées</option>
              <option value="RESOLVED">Résolues</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des alertes */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts
            .sort((a, b) => {
              // Trier par sévérité puis par date
              const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
              const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
              if (severityDiff !== 0) return severityDiff;
              return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            })
            .map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))
        ) : (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune alerte trouvée</h3>
            <p className="text-gray-600">
              Modifiez vos critères de recherche ou de filtrage pour voir plus d&apos;alertes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
