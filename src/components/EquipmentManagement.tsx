'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Wrench,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Calendar,
  Thermometer,
  Gauge as GaugeIcon,
  Droplet,
  Activity,
  MapPin,
  Info
} from 'lucide-react';
import { Equipment, EquipmentStatus, SensorType } from '../types';
import { mockEquipments } from '../data/mockData';
// import { useAppContext } from '../context/AppContext';
import EquipmentForm from './forms/EquipmentForm';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EquipmentCardProps {
  equipment: Equipment;
  onViewDetails: (equipment: Equipment) => void;
}

interface EquipmentDetailsProps {
  equipment: Equipment;
  onClose: () => void;
}

export default function EquipmentManagement() {
  // const { equipments, deleteEquipment } = useAppContext();
  const equipments = mockEquipments; // Utilisation temporaire des données mock
  const deleteEquipment = (id: string) => {
    console.log('Suppression équipement:', id);
    // Fonction temporaire - sera remplacée par le contexte
  };
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<EquipmentStatus | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipments = equipments.filter((equipment: Equipment) => {
    const matchesStatus = filterStatus === 'ALL' || equipment.status === filterStatus;
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleDeleteEquipment = (id: string) => {
    deleteEquipment(id);
    setShowDeleteConfirm(null);
  };

  const getStatusInfo = (status: EquipmentStatus) => {
    switch (status) {
      case 'OPERATIONAL':
        return { icon: CheckCircle, color: 'text-green-600 bg-green-100', label: 'Opérationnel' };
      case 'WARNING':
        return { icon: AlertTriangle, color: 'text-yellow-600 bg-yellow-100', label: 'Attention' };
      case 'CRITICAL':
        return { icon: AlertTriangle, color: 'text-red-600 bg-red-100', label: 'Critique' };
      case 'MAINTENANCE':
        return { icon: Wrench, color: 'text-blue-600 bg-blue-100', label: 'Maintenance' };
      case 'OUT_OF_SERVICE':
        return { icon: Clock, color: 'text-gray-600 bg-gray-100', label: 'Hors service' };
      default:
        return { icon: Settings, color: 'text-gray-600 bg-gray-100', label: 'Inconnu' };
    }
  };

  const getSensorIcon = (type: SensorType) => {
    switch (type) {
      case 'TEMPERATURE': return Thermometer;
      case 'PRESSURE': return GaugeIcon;
      case 'FLOW_RATE': return Droplet;
      case 'VIBRATION': return Activity;
      default: return Activity;
    }
  };

  const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onViewDetails }) => {
    const statusInfo = getStatusInfo(equipment.status);
    const StatusIcon = statusInfo.icon;

    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate flex-1">{equipment.name}</h3>
          <div className={`flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ml-2 flex-shrink-0 ${statusInfo.color}`}>
            <StatusIcon className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            <span className="hidden sm:inline">{statusInfo.label}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs md:text-sm text-gray-600">
            <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{equipment.location}</span>
          </div>
          <div className="flex items-center text-xs md:text-sm text-gray-600">
            <Settings className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{equipment.specifications.manufacturer} - {equipment.specifications.model}</span>
          </div>
          <div className="flex items-center text-xs md:text-sm text-gray-600">
            <Clock className="h-3 w-3 md:h-4 md:w-4 mr-2 flex-shrink-0" />
            <span>{equipment.operatingHours.toLocaleString('fr-FR')} heures de fonctionnement</span>
          </div>
        </div>

        {equipment.sensors.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Capteurs actifs</h4>
            <div className="grid grid-cols-2 gap-2">
              {equipment.sensors.slice(0, 4).map(sensor => {
                const SensorIcon = getSensorIcon(sensor.type);
                const isWarning = sensor.currentValue >= sensor.warningThreshold;
                const isCritical = sensor.currentValue >= sensor.criticalThreshold;
                
                return (
                  <div key={sensor.id} className="flex items-center text-xs">
                    <SensorIcon className={`h-3 w-3 mr-1 ${
                      isCritical ? 'text-red-500' : isWarning ? 'text-yellow-500' : 'text-green-500'
                    }`} />
                    <span className="truncate">
                      {sensor.currentValue.toFixed(1)} {sensor.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {equipment.nextMaintenanceDate && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center text-sm text-blue-700">
              <Calendar className="h-4 w-4 mr-2" />
              Prochaine maintenance: {format(equipment.nextMaintenanceDate, 'dd MMMM yyyy', { locale: fr })}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onViewDetails(equipment)}
            className="flex items-center px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            title="Voir les détails"
          >
            <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            <span className="hidden sm:inline">Détails</span>
          </button>
          <button
            onClick={() => setEditingEquipment(equipment)}
            className="flex items-center px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
            title="Modifier l'équipement"
          >
            <Edit3 className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            <span className="hidden sm:inline">Modifier</span>
          </button>
          <button
            onClick={() => setShowDeleteConfirm(equipment.id)}
            className="flex items-center px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
            title="Supprimer l'équipement"
          >
            <Trash2 className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            <span className="hidden sm:inline">Supprimer</span>
          </button>
        </div>
      </div>
    );
  };

  const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({ equipment, onClose }) => {
    const statusInfo = getStatusInfo(equipment.status);
    const StatusIcon = statusInfo.icon;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-gray-900 mr-4">{equipment.name}</h2>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                  <StatusIcon className="h-4 w-4 mr-1" />
                  {statusInfo.label}
                </div>
              </div>
              <button
                onClick={onClose}
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
            {/* Informations générales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Informations générales
                </h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Type:</span> {equipment.type}</div>
                  <div><span className="font-medium">Localisation:</span> {equipment.location}</div>
                  <div><span className="font-medium">Date d&apos;installation:</span> {format(equipment.installationDate, 'dd MMMM yyyy', { locale: fr })}</div>
                  <div><span className="font-medium">Heures de fonctionnement:</span> {equipment.operatingHours.toLocaleString('fr-FR')} h</div>
                  {equipment.lastMaintenanceDate && (
                    <div><span className="font-medium">Dernière maintenance:</span> {format(equipment.lastMaintenanceDate, 'dd MMMM yyyy', { locale: fr })}</div>
                  )}
                  {equipment.nextMaintenanceDate && (
                    <div><span className="font-medium">Prochaine maintenance:</span> {format(equipment.nextMaintenanceDate, 'dd MMMM yyyy', { locale: fr })}</div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Spécifications techniques
                </h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Fabricant:</span> {equipment.specifications.manufacturer}</div>
                  <div><span className="font-medium">Modèle:</span> {equipment.specifications.model}</div>
                  <div><span className="font-medium">N° de série:</span> {equipment.specifications.serialNumber}</div>
                  {equipment.specifications.capacity && (
                    <div><span className="font-medium">Capacité:</span> {equipment.specifications.capacity}</div>
                  )}
                  {equipment.specifications.power && (
                    <div><span className="font-medium">Puissance:</span> {equipment.specifications.power} kW</div>
                  )}
                  {equipment.specifications.pressure && (
                    <div><span className="font-medium">Pression:</span> {equipment.specifications.pressure} bar</div>
                  )}
                  {equipment.specifications.temperature && (
                    <div><span className="font-medium">Température:</span> {equipment.specifications.temperature} °C</div>
                  )}
                  {equipment.specifications.flowRate && (
                    <div><span className="font-medium">Débit:</span> {equipment.specifications.flowRate} m³/h</div>
                  )}
                </div>
              </div>
            </div>

            {/* Capteurs */}
            {equipment.sensors.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Capteurs et mesures
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {equipment.sensors.map(sensor => {
                    const SensorIcon = getSensorIcon(sensor.type);
                    const isWarning = sensor.currentValue >= sensor.warningThreshold;
                    const isCritical = sensor.currentValue >= sensor.criticalThreshold;
                    
                    return (
                      <div key={sensor.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <SensorIcon className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm font-medium">{sensor.name}</span>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isCritical ? 'text-red-600 bg-red-100' : 
                            isWarning ? 'text-yellow-600 bg-yellow-100' : 
                            'text-green-600 bg-green-100'
                          }`}>
                            {isCritical ? 'Critique' : isWarning ? 'Attention' : 'Normal'}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {sensor.currentValue.toFixed(1)} {sensor.unit}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Seuils: {sensor.warningThreshold} / {sensor.criticalThreshold} {sensor.unit}
                        </div>
                        <div className="text-xs text-gray-500">
                          Plage: {sensor.minValue} - {sensor.maxValue} {sensor.unit}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-3 md:p-6">
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Gestion des Équipements</h1>
          <p className="text-sm md:text-base text-gray-600">
            Supervision et contrôle des équipements industriels - Site de Douala
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter un équipement
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rechercher</label>
            <input
              type="text"
              placeholder="Nom ou localisation de l'équipement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div className="md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as EquipmentStatus | 'ALL')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              title="Filtrer par statut"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="OPERATIONAL">Opérationnel</option>
              <option value="WARNING">Attention</option>
              <option value="CRITICAL">Critique</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="OUT_OF_SERVICE">Hors service</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-4 md:mb-6">
        {[
          { status: 'OPERATIONAL', label: 'Opérationnels', color: 'text-green-600 bg-green-100' },
          { status: 'WARNING', label: 'Attention', color: 'text-yellow-600 bg-yellow-100' },
          { status: 'CRITICAL', label: 'Critiques', color: 'text-red-600 bg-red-100' },
          { status: 'MAINTENANCE', label: 'Maintenance', color: 'text-blue-600 bg-blue-100' },
          { status: 'OUT_OF_SERVICE', label: 'Hors service', color: 'text-gray-600 bg-gray-100' }
        ].map(({ status, label, color }) => {
          const count = equipments.filter((eq: Equipment) => eq.status === status).length;
          return (
            <div key={status} className="bg-white rounded-lg shadow-md p-3 md:p-4 text-center">
              <div className={`text-xl md:text-2xl font-bold ${color.split(' ')[0]}`}>{count}</div>
              <div className="text-xs md:text-sm text-gray-600">{label}</div>
            </div>
          );
        })}
      </div>

      {/* Liste des équipements */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredEquipments.map(equipment => (
          <EquipmentCard
            key={equipment.id}
            equipment={equipment}
            onViewDetails={setSelectedEquipment}
          />
        ))}
      </div>

      {filteredEquipments.length === 0 && (
        <div className="text-center py-12">
          <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun équipement trouvé</h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou de filtrage.
          </p>
        </div>
      )}

      {/* Modal de détails */}
      {selectedEquipment && (
        <EquipmentDetails
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
        />
      )}

      {/* Formulaire d'ajout d'équipement */}
      <EquipmentForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSuccess={() => {
          setShowAddForm(false);
          // Refresh des données déjà fait par le contexte
        }}
      />

      {/* Formulaire de modification d'équipement */}
      {editingEquipment && (
        <EquipmentForm
          equipment={editingEquipment}
          isOpen={true}
          onClose={() => setEditingEquipment(null)}
          onSuccess={() => {
            setEditingEquipment(null);
            // Refresh des données déjà fait par le contexte
          }}
        />
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">Confirmer la suppression</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cet équipement ? Cette action est irréversible et supprimera également tous les enregistrements de maintenance associés.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDeleteEquipment(showDeleteConfirm)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
