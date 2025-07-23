'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  DollarSign,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  BarChart as RechartsBarChart, 
  Bar 
} from 'recharts';
import { mockPerformanceData, mockMaintenanceRecords, mockEquipments, mockAlerts } from '../data/mockData';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function AnalyticsManagement() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '3m' | '6m'>('30d');
  const [analysisType, setAnalysisType] = useState<'performance' | 'maintenance' | 'costs' | 'reliability'>('performance');

  // Données de performance par période
  const getPerformanceDataByRange = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '3m' ? 90 : 180;
    return mockPerformanceData.slice(-days);
  };

  // Analyse des coûts de maintenance
  const maintenanceCosts = mockMaintenanceRecords.map(record => ({
    month: format(record.scheduledDate, 'MMM yyyy', { locale: fr }),
    cost: record.cost,
    type: record.type,
    equipment: mockEquipments.find(eq => eq.id === record.equipmentId)?.name || 'Inconnu'
  }));

  // Statistiques de fiabilité
  const calculateReliabilityStats = () => {
    const total = mockMaintenanceRecords.length;
    const preventive = mockMaintenanceRecords.filter(r => r.type === 'PREVENTIVE').length;
    const corrective = mockMaintenanceRecords.filter(r => r.type === 'CORRECTIVE').length;
    const emergency = mockMaintenanceRecords.filter(r => r.type === 'EMERGENCY').length;
    
    return {
      preventiveRatio: (preventive / total) * 100,
      correctiveRatio: (corrective / total) * 100,
      emergencyRatio: (emergency / total) * 100,
      totalInterventions: total
    };
  };

  // Distribution des types de maintenance
  const maintenanceDistribution = [
    { 
      name: 'Préventive', 
      value: mockMaintenanceRecords.filter(r => r.type === 'PREVENTIVE').length,
      color: '#10B981'
    },
    { 
      name: 'Corrective', 
      value: mockMaintenanceRecords.filter(r => r.type === 'CORRECTIVE').length,
      color: '#F59E0B'
    },
    { 
      name: 'Prédictive', 
      value: mockMaintenanceRecords.filter(r => r.type === 'PREDICTIVE').length,
      color: '#3B82F6'
    },
    { 
      name: 'Urgence', 
      value: mockMaintenanceRecords.filter(r => r.type === 'EMERGENCY').length,
      color: '#EF4444'
    },
    { 
      name: 'Inspection', 
      value: mockMaintenanceRecords.filter(r => r.type === 'INSPECTION').length,
      color: '#8B5CF6'
    }
  ];

  // Coûts par équipement
  const costsByEquipment = mockEquipments.map(equipment => {
    const equipmentRecords = mockMaintenanceRecords.filter(r => r.equipmentId === equipment.id);
    const totalCost = equipmentRecords.reduce((sum, record) => sum + record.cost, 0);
    return {
      name: equipment.name,
      cost: totalCost,
      interventions: equipmentRecords.length
    };
  });

  // KPIs de tendance
  const getTrendKPIs = () => {
    const performanceData = getPerformanceDataByRange();
    const currentAvg = performanceData.slice(-7).reduce((sum, d) => sum + d.metrics.availability, 0) / 7;
    const previousAvg = performanceData.slice(-14, -7).reduce((sum, d) => sum + d.metrics.availability, 0) / 7;
    const trend = ((currentAvg - previousAvg) / previousAvg) * 100;

    return {
      availability: currentAvg,
      trend: trend,
      direction: trend >= 0 ? 'up' : 'down'
    };
  };

  const reliabilityStats = calculateReliabilityStats();
  const trendKPIs = getTrendKPIs();
  const performanceData = getPerformanceDataByRange();

  // Alertes par sévérité
  const alertsBySeverity = [
    { name: 'Faible', value: mockAlerts.filter(a => a.severity === 'LOW').length, color: '#10B981' },
    { name: 'Moyenne', value: mockAlerts.filter(a => a.severity === 'MEDIUM').length, color: '#F59E0B' },
    { name: 'Élevée', value: mockAlerts.filter(a => a.severity === 'HIGH').length, color: '#EF4444' },
    { name: 'Critique', value: mockAlerts.filter(a => a.severity === 'CRITICAL').length, color: '#DC2626' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analyses Avancées</h1>
          <p className="mt-1 text-gray-600">
            Tableaux de bord et indicateurs de performance
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-4">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '3m' | '6m')}
            aria-label="Sélectionner la période"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="3m">3 derniers mois</option>
            <option value="6m">6 derniers mois</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value as 'performance' | 'maintenance' | 'costs' | 'reliability')}
            aria-label="Type d'analyse"
          >
            <option value="performance">Performance</option>
            <option value="maintenance">Maintenance</option>
            <option value="costs">Coûts</option>
            <option value="reliability">Fiabilité</option>
          </select>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Disponibilité Moyenne</p>
              <p className="text-2xl font-bold text-gray-900">{trendKPIs.availability.toFixed(1)}%</p>
              <div className={`flex items-center text-sm ${trendKPIs.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trendKPIs.direction === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {Math.abs(trendKPIs.trend).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Maintenance Préventive</p>
              <p className="text-2xl font-bold text-gray-900">{reliabilityStats.preventiveRatio.toFixed(0)}%</p>
              <p className="text-sm text-gray-500">du total</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Coût Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {maintenanceCosts.reduce((sum, record) => sum + record.cost, 0).toLocaleString('fr-FR')} FCFA
              </p>
              <p className="text-sm text-gray-500">ce mois</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Interventions Urgentes</p>
              <p className="text-2xl font-bold text-gray-900">{reliabilityStats.emergencyRatio.toFixed(0)}%</p>
              <p className="text-sm text-gray-500">du total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques principaux */}
      {analysisType === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance dans le temps */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Évolution de la Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(timestamp) => format(new Date(timestamp), 'dd/MM')}
                />
                <YAxis domain={[70, 100]} />
                <Tooltip 
                  labelFormatter={(timestamp) => format(new Date(timestamp), 'dd MMMM yyyy', { locale: fr })}
                />
                <Line 
                  type="monotone" 
                  dataKey="metrics.availability" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Disponibilité (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="metrics.efficiency" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Efficacité (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="metrics.oee" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="OEE (%)"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>

          {/* Distribution des alertes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Distribution des Alertes
            </h3>
            <div className="flex flex-col lg:flex-row items-center">
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Pie
                    data={alertsBySeverity}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {alertsBySeverity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="lg:ml-4 mt-4 lg:mt-0">
                {alertsBySeverity.map((item, index) => {
                  const getColorClass = () => {
                    switch (item.color) {
                      case '#10B981': return 'chart-indicator-green';
                      case '#F59E0B': return 'chart-indicator-yellow';
                      case '#EF4444': return 'chart-indicator-red';
                      case '#DC2626': return 'chart-indicator-dark-red';
                      default: return 'chart-indicator-blue';
                    }
                  };

                  return (
                    <div key={index} className="flex items-center mb-2">
                      <div className={`chart-indicator ${getColorClass()}`}></div>
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
      )}

      {analysisType === 'maintenance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Types de maintenance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Types de Maintenance
            </h3>
            <div className="flex flex-col lg:flex-row items-center">
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Pie
                    data={maintenanceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {maintenanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="lg:ml-4 mt-4 lg:mt-0">
                {maintenanceDistribution.map((item, index) => {
                  const getColorClass = () => {
                    switch (item.color) {
                      case '#10B981': return 'chart-indicator-green';
                      case '#F59E0B': return 'chart-indicator-yellow';
                      case '#3B82F6': return 'chart-indicator-blue';
                      case '#EF4444': return 'chart-indicator-red';
                      case '#8B5CF6': return 'chart-indicator-purple';
                      default: return 'chart-indicator-blue';
                    }
                  };

                  return (
                    <div key={index} className="flex items-center mb-2">
                      <div className={`chart-indicator ${getColorClass()}`}></div>
                      <span className="text-sm text-gray-700">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Temps de réponse MTTR */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              MTTR par Équipement
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsBarChart data={performanceData.slice(-10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(timestamp) => format(new Date(timestamp), 'dd/MM')}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(timestamp) => format(new Date(timestamp), 'dd MMMM yyyy', { locale: fr })}
                />
                <Bar dataKey="metrics.mttr" fill="#F59E0B" name="MTTR (heures)" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {analysisType === 'costs' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coûts par équipement */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Coûts par Équipement
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={costsByEquipment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value.toLocaleString('fr-FR')} FCFA`, 'Coût']} />
                <Bar dataKey="cost" fill="#3B82F6" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>

          {/* Évolution des coûts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Évolution Budgétaire
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Budget Mensuel</span>
                <span className="text-lg font-bold text-gray-900">3,060,000 FCFA</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-medium text-gray-900">Dépensé ce mois</span>
                <span className="text-lg font-bold text-blue-600">
                  {maintenanceCosts.reduce((sum, record) => sum + record.cost, 0).toLocaleString('fr-FR')} FCFA
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-900">Économies préventive</span>
                <span className="text-lg font-bold text-green-600">15%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {analysisType === 'reliability' && (
        <div className="space-y-6">
          {/* MTBF et MTTR */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                MTBF - Temps Moyen Entre Pannes
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsLineChart data={performanceData.slice(-15)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => format(new Date(timestamp), 'dd/MM')}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(timestamp) => format(new Date(timestamp), 'dd MMMM yyyy', { locale: fr })}
                    formatter={(value: number) => [`${value.toFixed(0)}h`, 'MTBF']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="metrics.mtbf" 
                    stroke="#10B981" 
                    strokeWidth={2}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Indicateurs de Fiabilité
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ratio Préventif/Correctif</span>
                  <span className="font-semibold">
                    {(reliabilityStats.preventiveRatio / reliabilityStats.correctiveRatio).toFixed(1)}:1
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Interventions totales</span>
                  <span className="font-semibold">{reliabilityStats.totalInterventions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Taux d&apos;urgence</span>
                  <span className="font-semibold text-red-600">
                    {reliabilityStats.emergencyRatio.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Disponibilité système</span>
                  <span className="font-semibold text-green-600">
                    {trendKPIs.availability.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
