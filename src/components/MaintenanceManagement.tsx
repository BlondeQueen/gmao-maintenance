'use client';

import React, { useState } from 'react';
import { 
  Wrench, 
  Calendar, 
  Clock, 
  User,
  FileText,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  Filter,
  Search,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { mockEquipments } from '../data/mockData';
import { MaintenanceRecord, MaintenanceType, MaintenanceStatus, Priority } from '../types';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

// Données simulées pour les ordres de maintenance
const mockMaintenanceOrders: MaintenanceRecord[] = [
  {
    id: 'WO001',
    equipmentId: 'EQ001',
    type: 'PREVENTIVE',
    status: 'SCHEDULED',
    scheduledDate: addDays(new Date(), 7),
    technician: 'Paul Mbarga',
    description: 'Remplacement des joints et nettoyage de l\'échangeur',
    workOrder: 'WO-2025-001',
    duration: 4,
    cost: 275000,
    partsUsed: [
      { partId: 'SP001', partName: 'Joint échangeur', quantity: 2, unitCost: 92000, totalCost: 184000 }
    ],
    priority: 'MEDIUM',
    notes: 'Prévoir arrêt système 4h le dimanche matin'
  },
  {
    id: 'WO002',
    equipmentId: 'EQ004',
    type: 'CORRECTIVE',
    status: 'IN_PROGRESS',
    scheduledDate: new Date(),
    actualDate: new Date(),
    technician: 'Célestine Ngouma',
    description: 'Remplacement cartouche filtre à huile - Pression critique',
    workOrder: 'WO-2025-002',
    duration: 2,
    cost: 113000,
    partsUsed: [
      { partId: 'SP002', partName: 'Cartouche filtre huile', quantity: 1, unitCost: 52000, totalCost: 52000 }
    ],
    priority: 'CRITICAL',
    failureMode: 'Colmatage filtre',
    rootCause: 'Dépassement intervalle de maintenance'
  },
  {
    id: 'WO003',
    equipmentId: 'EQ003',
    type: 'PREDICTIVE',
    status: 'COMPLETED',
    scheduledDate: addDays(new Date(), -3),
    actualDate: addDays(new Date(), -3),
    completedDate: addDays(new Date(), -2),
    technician: 'Emmanuel Biya',
    description: 'Contrôle vibratoire et alignement pompe',
    workOrder: 'WO-2025-003',
    duration: 3,
    cost: 196000,
    partsUsed: [],
    priority: 'MEDIUM',
    notes: 'Vibrations dans les normes, alignement OK'
  }
];

export default function MaintenanceManagement() {
  const [maintenanceOrders] = useState(mockMaintenanceOrders);
  const [filterType, setFilterType] = useState<MaintenanceType | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<MaintenanceStatus | 'ALL'>('ALL');
  const [filterPriority, setFilterPriority] = useState<Priority | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<MaintenanceRecord | null>(null);

  // Filtrage des ordres
  const filteredOrders = maintenanceOrders.filter(order => {
    const equipment = mockEquipments.find(eq => eq.id === order.equipmentId);
    const equipmentName = equipment?.name || '';
    
    const matchesType = filterType === 'ALL' || order.type === filterType;
    const matchesStatus = filterStatus === 'ALL' || order.status === filterStatus;
    const matchesPriority = filterPriority === 'ALL' || order.priority === filterPriority;
    const matchesSearch = equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.workOrder.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesPriority && matchesSearch;
  });

  // Statistiques
  const stats = {
    total: maintenanceOrders.length,
    scheduled: maintenanceOrders.filter(o => o.status === 'SCHEDULED').length,
    inProgress: maintenanceOrders.filter(o => o.status === 'IN_PROGRESS').length,
    completed: maintenanceOrders.filter(o => o.status === 'COMPLETED').length,
    overdue: maintenanceOrders.filter(o => 
      o.status === 'SCHEDULED' && new Date(o.scheduledDate) < new Date()
    ).length,
    totalCost: maintenanceOrders.reduce((sum, o) => sum + o.cost, 0),
    avgDuration: maintenanceOrders.reduce((sum, o) => sum + o.duration, 0) / maintenanceOrders.length
  };

  const getTypeInfo = (type: MaintenanceType) => {
    switch (type) {
      case 'PREVENTIVE':
        return { icon: Calendar, color: 'text-blue-600 bg-blue-100', label: 'Préventive' };
      case 'CORRECTIVE':
        return { icon: Wrench, color: 'text-red-600 bg-red-100', label: 'Corrective' };
      case 'PREDICTIVE':
        return { icon: TrendingUp, color: 'text-purple-600 bg-purple-100', label: 'Prédictive' };
      case 'EMERGENCY':
        return { icon: AlertTriangle, color: 'text-red-600 bg-red-100', label: 'Urgence' };
      case 'INSPECTION':
        return { icon: Eye, color: 'text-green-600 bg-green-100', label: 'Inspection' };
      default:
        return { icon: Wrench, color: 'text-gray-600 bg-gray-100', label: 'Autre' };
    }
  };

  const getStatusInfo = (status: MaintenanceStatus) => {
    switch (status) {
      case 'SCHEDULED':
        return { icon: Calendar, color: 'text-blue-600 bg-blue-100', label: 'Planifiée' };
      case 'IN_PROGRESS':
        return { icon: Clock, color: 'text-yellow-600 bg-yellow-100', label: 'En cours' };
      case 'COMPLETED':
        return { icon: CheckCircle, color: 'text-green-600 bg-green-100', label: 'Terminée' };
      case 'CANCELLED':
        return { icon: AlertTriangle, color: 'text-gray-600 bg-gray-100', label: 'Annulée' };
      case 'PENDING':
        return { icon: Clock, color: 'text-orange-600 bg-orange-100', label: 'En attente' };
      case 'OVERDUE':
        return { icon: AlertTriangle, color: 'text-red-600 bg-red-100', label: 'En retard' };
      default:
        return { icon: Clock, color: 'text-gray-600 bg-gray-100', label: 'Inconnu' };
    }
  };

  const getPriorityInfo = (priority: Priority) => {
    switch (priority) {
      case 'CRITICAL':
        return { color: 'text-red-600 bg-red-100 border-red-200', label: 'Critique' };
      case 'HIGH':
        return { color: 'text-orange-600 bg-orange-100 border-orange-200', label: 'Élevée' };
      case 'MEDIUM':
        return { color: 'text-yellow-600 bg-yellow-100 border-yellow-200', label: 'Moyenne' };
      case 'LOW':
        return { color: 'text-green-600 bg-green-100 border-green-200', label: 'Faible' };
      default:
        return { color: 'text-gray-600 bg-gray-100 border-gray-200', label: 'Normale' };
    }
  };

  const StatCard = ({ title, value, unit, color, icon: Icon }: { 
    title: string; 
    value: number | string; 
    unit?: string;
    color: string; 
    icon: React.ComponentType<{ className?: string }>; 
  }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>
            {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
            {unit && <span className="text-sm ml-1">{unit}</span>}
          </p>
        </div>
        <div className={`p-2 rounded-full ${color === 'text-blue-600' ? 'bg-blue-100' : 
                                           color === 'text-green-600' ? 'bg-green-100' :
                                           color === 'text-red-600' ? 'bg-red-100' :
                                           color === 'text-yellow-600' ? 'bg-yellow-100' : 'bg-gray-100'}`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </div>
    </div>
  );

  const MaintenanceCard = ({ order }: { order: MaintenanceRecord }) => {
    const equipment = mockEquipments.find(eq => eq.id === order.equipmentId);
    const typeInfo = getTypeInfo(order.type);
    const statusInfo = getStatusInfo(order.status);
    const priorityInfo = getPriorityInfo(order.priority);
    const TypeIcon = typeInfo.icon;
    const StatusIcon = statusInfo.icon;

    const isOverdue = order.status === 'SCHEDULED' && new Date(order.scheduledDate) < new Date();

    return (
      <div className={`bg-white rounded-lg shadow-md border-l-4 p-4 ${
        order.priority === 'CRITICAL' ? 'border-red-500' :
        order.priority === 'HIGH' ? 'border-orange-500' :
        order.priority === 'MEDIUM' ? 'border-yellow-500' : 'border-green-500'
      } ${isOverdue ? 'bg-red-50' : ''}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <TypeIcon className={`h-4 w-4 ${typeInfo.color.split(' ')[0]}`} />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
              {typeInfo.label}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.color}`}>
              {priorityInfo.label}
            </span>
          </div>
          <span className="text-xs text-gray-500">{order.workOrder}</span>
        </div>

        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 mb-1">{equipment?.name || 'Équipement inconnu'}</h3>
          <p className="text-gray-700 text-sm mb-2">{order.description}</p>
          
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {order.technician}
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {format(order.scheduledDate, 'dd/MM/yyyy', { locale: fr })}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {order.duration}h
            </div>
            <div className="flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              {order.cost.toLocaleString('fr-FR')} FCFA
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StatusIcon className={`h-4 w-4 ${statusInfo.color.split(' ')[0]}`} />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
            {isOverdue && (
              <span className="px-2 py-1 rounded-full text-xs font-medium text-red-600 bg-red-100">
                En retard
              </span>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedOrder(order)}
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
            >
              <Eye className="h-3 w-3 inline mr-1" />
              Détails
            </button>
            <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors">
              <Edit className="h-3 w-3 inline mr-1" />
              Modifier
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestion de la Maintenance</h1>
          <p className="text-gray-600">
            Planification et suivi des interventions de maintenance
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Nouvel Ordre
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        <StatCard title="Total" value={stats.total} color="text-gray-600" icon={FileText} />
        <StatCard title="Planifiées" value={stats.scheduled} color="text-blue-600" icon={Calendar} />
        <StatCard title="En cours" value={stats.inProgress} color="text-yellow-600" icon={Clock} />
        <StatCard title="Terminées" value={stats.completed} color="text-green-600" icon={CheckCircle} />
        <StatCard title="En retard" value={stats.overdue} color="text-red-600" icon={AlertTriangle} />
        <StatCard title="Coût total" value={stats.totalCost} unit="FCFA" color="text-purple-600" icon={DollarSign} />
        <StatCard title="Durée moy." value={stats.avgDuration.toFixed(1)} unit="h" color="text-indigo-600" icon={Clock} />
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Search className="inline h-4 w-4 mr-1" />
              Rechercher
            </label>
            <input
              type="text"
              placeholder="Équipement, description, OT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Filter className="inline h-4 w-4 mr-1" />
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as MaintenanceType | 'ALL')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filtrer par type de maintenance"
            >
              <option value="ALL">Tous les types</option>
              <option value="PREVENTIVE">Préventive</option>
              <option value="CORRECTIVE">Corrective</option>
              <option value="PREDICTIVE">Prédictive</option>
              <option value="EMERGENCY">Urgence</option>
              <option value="INSPECTION">Inspection</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Filter className="inline h-4 w-4 mr-1" />
              Statut
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as MaintenanceStatus | 'ALL')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filtrer par statut de maintenance"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="SCHEDULED">Planifiée</option>
              <option value="IN_PROGRESS">En cours</option>
              <option value="COMPLETED">Terminée</option>
              <option value="CANCELLED">Annulée</option>
              <option value="PENDING">En attente</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Filter className="inline h-4 w-4 mr-1" />
              Priorité
            </label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as Priority | 'ALL')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filtrer par priorité"
            >
              <option value="ALL">Toutes les priorités</option>
              <option value="CRITICAL">Critique</option>
              <option value="HIGH">Élevée</option>
              <option value="MEDIUM">Moyenne</option>
              <option value="LOW">Faible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des ordres de maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders
            .sort((a, b) => {
              // Trier par priorité puis par date
              const priorityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
              const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
              if (priorityDiff !== 0) return priorityDiff;
              return new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
            })
            .map(order => (
              <MaintenanceCard key={order.id} order={order} />
            ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun ordre de maintenance trouvé</h3>
            <p className="text-gray-600">
              Modifiez vos critères de recherche ou créez un nouvel ordre de maintenance.
            </p>
          </div>
        )}
      </div>

      {/* Modal de détails */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Ordre de Travail {selectedOrder.workOrder}
                  </h2>
                  <p className="text-gray-600">
                    {mockEquipments.find(eq => eq.id === selectedOrder.equipmentId)?.name}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Fermer"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* En-tête avec badges */}
              <div className="flex flex-wrap gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityInfo(selectedOrder.priority).color}`}>
                  {getPriorityInfo(selectedOrder.priority).label}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedOrder.status).color}`}>
                  {getStatusInfo(selectedOrder.status).label}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeInfo(selectedOrder.type).color}`}>
                  {getTypeInfo(selectedOrder.type).label}
                </span>
              </div>

              {/* Informations principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Informations générales</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.description}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Technicien assigné</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.technician}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Durée prévue</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.duration} heures</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Coût estimé</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.cost.toLocaleString('fr-FR')} FCFA</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Planification</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date planifiée</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {format(selectedOrder.scheduledDate, 'dd/MM/yyyy HH:mm', { locale: fr })}
                    </p>
                  </div>

                  {selectedOrder.actualDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date de début réelle</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {format(selectedOrder.actualDate, 'dd/MM/yyyy HH:mm', { locale: fr })}
                      </p>
                    </div>
                  )}

                  {selectedOrder.completedDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date de fin</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {format(selectedOrder.completedDate, 'dd/MM/yyyy HH:mm', { locale: fr })}
                      </p>
                    </div>
                  )}

                  {selectedOrder.failureMode && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mode de défaillance</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedOrder.failureMode}</p>
                    </div>
                  )}

                  {selectedOrder.rootCause && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cause racine</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedOrder.rootCause}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Pièces utilisées */}
              {selectedOrder.partsUsed && selectedOrder.partsUsed.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pièces utilisées</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pièce
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantité
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prix unitaire
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.partsUsed.map((part, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {part.partName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {part.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {part.unitCost.toLocaleString('fr-FR')} FCFA
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {part.totalCost.toLocaleString('fr-FR')} FCFA
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan={3} className="px-6 py-3 text-sm font-medium text-gray-900 text-right">
                            Total pièces:
                          </td>
                          <td className="px-6 py-3 text-sm font-bold text-gray-900">
                            {selectedOrder.partsUsed.reduce((sum, part) => sum + part.totalCost, 0).toLocaleString('fr-FR')} FCFA
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Fermer
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Modifier
                </button>
                {selectedOrder.status === 'SCHEDULED' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                    Démarrer
                  </button>
                )}
                {selectedOrder.status === 'IN_PROGRESS' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                    Terminer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
