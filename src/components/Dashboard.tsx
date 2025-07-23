'use client';

import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Thermometer,
  Gauge,
  Droplet
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockSystemOverview, mockKPIs, mockPerformanceData, mockAlerts, mockEquipments } from '../data/mockData';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Dashboard() {
  const systemData = mockSystemOverview;
  const kpis = mockKPIs;
  const performanceData = mockPerformanceData.slice(-7); // 7 derniers jours
  const criticalAlerts = mockAlerts.filter(alert => alert.severity === 'CRITICAL' && !alert.resolved);
  const operationalEquipments = mockEquipments.filter(eq => eq.status === 'OPERATIONAL');
  const warningEquipments = mockEquipments.filter(eq => eq.status === 'WARNING');
  const criticalEquipments = mockEquipments.filter(eq => eq.status === 'CRITICAL');

  const equipmentStatusData = [
    { name: 'Opérationnel', value: operationalEquipments.length, color: '#10B981' },
    { name: 'Avertissement', value: warningEquipments.length, color: '#F59E0B' },
    { name: 'Critique', value: criticalEquipments.length, color: '#EF4444' },
    { name: 'Maintenance', value: systemData.equipmentInMaintenance, color: '#6B7280' }
  ];

  interface StatusCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    trend?: 'up' | 'down';
  }

  const StatusCard: React.FC<StatusCardProps> = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color === 'text-green-600' ? 'bg-green-100' : 
                                            color === 'text-red-600' ? 'bg-red-100' : 
                                            color === 'text-yellow-600' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
      {trend && (
        <div className="mt-2 flex items-center">
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '+2.3%' : '-1.2%'} vs mois dernier
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Tableau de Bord - Système Industriel
        </h1>
        <p className="text-gray-600">
          Vue d&apos;ensemble du système de maintenance industrielle - Site de Douala
        </p>
        <div className="mt-4 text-sm text-gray-500">
          Dernière mise à jour: {format(systemData.lastSystemCheck, 'dd MMMM yyyy à HH:mm', { locale: fr })}
        </div>
      </div>

      {/* Alertes critiques */}
      {criticalAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-red-800 font-semibold">Alertes critiques actives</h3>
          </div>
          <div className="mt-2 space-y-2">
            {criticalAlerts.map(alert => (
              <div key={alert.id} className="text-red-700 text-sm">
                • {alert.equipmentName}: {alert.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cartes de statut */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="Disponibilité Système"
          value={`${systemData.systemEfficiency.toFixed(1)}%`}
          icon={Gauge}
          color="text-blue-600"
          trend="up"
        />
        <StatusCard
          title="Équipements Opérationnels"
          value={`${systemData.operationalEquipment}/${systemData.totalEquipment}`}
          subtitle="équipements actifs"
          icon={CheckCircle}
          color="text-green-600"
        />
        <StatusCard
          title="Alertes Actives"
          value={criticalAlerts.length}
          subtitle="interventions requises"
          icon={AlertTriangle}
          color="text-red-600"
        />
        <StatusCard
          title="Maintenance Planifiée"
          value={systemData.pendingMaintenanceOrders}
          subtitle="ordres en attente"
          icon={Clock}
          color="text-yellow-600"
        />
      </div>

      {/* Graphiques et données */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique de performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Système (7 derniers jours)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(timestamp) => format(new Date(timestamp), 'dd/MM')}
              />
              <YAxis domain={[70, 100]} />
              <Tooltip 
                labelFormatter={(timestamp) => format(new Date(timestamp), 'dd MMMM yyyy', { locale: fr })}
                formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
              />
              <Line 
                type="monotone" 
                dataKey="metrics.availability" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Disponibilité"
              />
              <Line 
                type="monotone" 
                dataKey="metrics.efficiency" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Efficacité"
              />
              <Line 
                type="monotone" 
                dataKey="metrics.oee" 
                stroke="#F59E0B" 
                strokeWidth={2}
                name="OEE"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition des équipements */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">État des Équipements</h3>
          <div className="flex flex-col lg:flex-row items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={equipmentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {equipmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="lg:ml-4 mt-4 lg:mt-0">
              {equipmentStatusData.map((item, index) => {
                const getStatusDotClass = () => {
                  switch (item.name) {
                    case 'Opérationnel': return 'status-dot-operational';
                    case 'Avertissement': return 'status-dot-warning';
                    case 'Critique': return 'status-dot-critical';
                    case 'Maintenance': return 'status-dot-maintenance';
                    default: return 'status-dot-maintenance';
                  }
                };

                return (
                  <div key={index} className="flex items-center mb-2">
                    <div className={`w-3 h-3 rounded-full mr-2 ${getStatusDotClass()}`}></div>
                    <span className="text-sm text-gray-700">
                      {item.name}: {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* KPIs détaillés */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicateurs Clés de Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi) => (
            <div key={kpi.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{kpi.name}</span>
                {kpi.trend === 'UP' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : kpi.trend === 'DOWN' ? (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ) : (
                  <Activity className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">
                  {kpi.value.toLocaleString('fr-FR')}
                </span>
                <span className="ml-1 text-gray-500">{kpi.unit}</span>
              </div>
              {kpi.target && (
                <div className="mt-1 text-sm text-gray-500">
                  Objectif: {kpi.target.toLocaleString('fr-FR')} {kpi.unit}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* État temps réel des capteurs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">État Temps Réel des Capteurs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockEquipments.flatMap(eq => eq.sensors).slice(0, 6).map((sensor) => {
            const getStatusColor = () => {
              if (sensor.currentValue >= sensor.criticalThreshold) return 'text-red-600 bg-red-100';
              if (sensor.currentValue >= sensor.warningThreshold) return 'text-yellow-600 bg-yellow-100';
              return 'text-green-600 bg-green-100';
            };

            const getSensorIcon = () => {
              switch (sensor.type) {
                case 'TEMPERATURE': return Thermometer;
                case 'PRESSURE': return Gauge;
                case 'FLOW_RATE': return Droplet;
                default: return Activity;
              }
            };

            const Icon = getSensorIcon();

            return (
              <div key={sensor.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Icon className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">{sensor.name}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                    {sensor.currentValue >= sensor.criticalThreshold ? 'Critique' :
                     sensor.currentValue >= sensor.warningThreshold ? 'Attention' : 'Normal'}
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-gray-900">
                    {sensor.currentValue.toFixed(1)}
                  </span>
                  <span className="ml-1 text-gray-500">{sensor.unit}</span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Seuil: {sensor.warningThreshold} / {sensor.criticalThreshold} {sensor.unit}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
