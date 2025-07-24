'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import { Equipment, EquipmentType, EquipmentStatus, Sensor, SensorType } from '../../types';
import { useData } from '../../contexts/DataContext';

interface EquipmentFormProps {
  equipment?: Equipment;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (equipment: Equipment) => void;
}

const equipmentTypes: { value: EquipmentType; label: string }[] = [
  { value: 'EXCHANGER', label: 'Échangeur' },
  { value: 'COOLING_TOWER', label: 'Tour de refroidissement' },
  { value: 'WATER_FILTER', label: 'Filtre à eau' },
  { value: 'OIL_FILTER', label: 'Filtre à huile' },
  { value: 'WATER_PUMP', label: 'Pompe à eau' },
  { value: 'OIL_PUMP', label: 'Pompe à huile' },
  { value: 'SENSOR', label: 'Capteur' },
  { value: 'FLOW_METER', label: 'Débitmètre' },
];

const equipmentStatuses: { value: EquipmentStatus; label: string }[] = [
  { value: 'OPERATIONAL', label: 'Opérationnel' },
  { value: 'WARNING', label: 'Attention' },
  { value: 'CRITICAL', label: 'Critique' },
  { value: 'MAINTENANCE', label: 'En maintenance' },
  { value: 'OUT_OF_SERVICE', label: 'Hors service' },
];

const sensorTypes: { value: SensorType; label: string }[] = [
  { value: 'TEMPERATURE', label: 'Température' },
  { value: 'PRESSURE', label: 'Pression' },
  { value: 'FLOW_RATE', label: 'Débit' },
  { value: 'VIBRATION', label: 'Vibration' },
  { value: 'PH_LEVEL', label: 'Niveau pH' },
  { value: 'CONDUCTIVITY', label: 'Conductivité' },
  { value: 'TURBIDITY', label: 'Turbidité' },
];

export default function EquipmentForm({ equipment, isOpen, onClose, onSuccess }: EquipmentFormProps) {
  const { addEquipment, updateEquipment } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Données de base de l'équipement
  const [formData, setFormData] = useState({
    name: '',
    type: 'EXCHANGER' as EquipmentType,
    status: 'OPERATIONAL' as EquipmentStatus,
    location: '',
    installationDate: '',
    operatingHours: 0,
    manufacturer: '',
    model: '',
    serialNumber: '',
    capacity: '',
    pressure: 0,
    temperature: 0,
    flowRate: 0,
    power: 0,
    voltage: 0,
  });

  // Capteurs
  const [sensors, setSensors] = useState<Omit<Sensor, 'id'>[]>([]);

  // Charger les données existantes si on modifie un équipement
  useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment.name,
        type: equipment.type,
        status: equipment.status,
        location: equipment.location,
        installationDate: equipment.installationDate.toISOString().split('T')[0],
        operatingHours: equipment.operatingHours,
        manufacturer: equipment.specifications.manufacturer,
        model: equipment.specifications.model,
        serialNumber: equipment.specifications.serialNumber,
        capacity: equipment.specifications.capacity || '',
        pressure: equipment.specifications.pressure || 0,
        temperature: equipment.specifications.temperature || 0,
        flowRate: equipment.specifications.flowRate || 0,
        power: equipment.specifications.power || 0,
        voltage: equipment.specifications.voltage || 0,
      });
      setSensors(equipment.sensors.map(sensor => ({
        type: sensor.type,
        name: sensor.name,
        unit: sensor.unit,
        currentValue: sensor.currentValue,
        minValue: sensor.minValue,
        maxValue: sensor.maxValue,
        warningThreshold: sensor.warningThreshold,
        criticalThreshold: sensor.criticalThreshold,
        lastReading: sensor.lastReading,
        isActive: sensor.isActive,
      })));
    } else {
      // Réinitialiser pour un nouvel équipement
      setFormData({
        name: '',
        type: 'EXCHANGER',
        status: 'OPERATIONAL',
        location: '',
        installationDate: new Date().toISOString().split('T')[0],
        operatingHours: 0,
        manufacturer: '',
        model: '',
        serialNumber: '',
        capacity: '',
        pressure: 0,
        temperature: 0,
        flowRate: 0,
        power: 0,
        voltage: 0,
      });
      setSensors([]);
    }
  }, [equipment]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const addSensor = () => {
    setSensors(prev => [...prev, {
      type: 'TEMPERATURE',
      name: '',
      unit: '°C',
      currentValue: 0,
      minValue: 0,
      maxValue: 100,
      warningThreshold: 80,
      criticalThreshold: 90,
      lastReading: new Date(),
      isActive: true,
    }]);
  };

  const updateSensor = (index: number, field: keyof Omit<Sensor, 'id'>, value: string | number | boolean | Date) => {
    setSensors(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeSensor = (index: number) => {
    setSensors(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const equipmentData: Equipment = {
        id: equipment?.id || `EQ-${Date.now()}`,
        name: formData.name,
        type: formData.type,
        status: formData.status,
        location: formData.location,
        installationDate: new Date(formData.installationDate),
        lastMaintenanceDate: equipment?.lastMaintenanceDate,
        nextMaintenanceDate: equipment?.nextMaintenanceDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Dans 30 jours par défaut
        operatingHours: formData.operatingHours,
        specifications: {
          manufacturer: formData.manufacturer,
          model: formData.model,
          serialNumber: formData.serialNumber,
          capacity: formData.capacity || undefined,
          pressure: formData.pressure || undefined,
          temperature: formData.temperature || undefined,
          flowRate: formData.flowRate || undefined,
          power: formData.power || undefined,
          voltage: formData.voltage || undefined,
        },
        sensors: sensors.map(sensor => ({
          ...sensor,
          id: `S${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
        })),
        maintenanceHistory: equipment?.maintenanceHistory || [],
      };

      if (equipment) {
        // Modification d'un équipement existant
        updateEquipment(equipmentData);
        console.log('Équipement modifié:', equipmentData);
      } else {
        // Ajout d'un nouvel équipement
        addEquipment(equipmentData);
        console.log('Nouvel équipement créé:', equipmentData);
      }
      
      if (onSuccess) {
        onSuccess(equipmentData);
      }
      
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'équipement:', error);
      alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {equipment ? 'Modifier l&apos;équipement' : 'Ajouter un équipement'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l&apos;équipement *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Échangeur Principal Zone A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d&apos;équipement *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {equipmentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {equipmentStatuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Zone A - Salle des machines"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d&apos;installation *
                </label>
                <input
                  type="date"
                  name="installationDate"
                  value={formData.installationDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heures de fonctionnement
                </label>
                <input
                  type="number"
                  name="operatingHours"
                  value={formData.operatingHours}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Spécifications techniques */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Spécifications techniques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fabricant *
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Alfa Laval"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modèle *
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: AX-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de série *
                  </label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: AL500-2024-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacité
                  </label>
                  <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 500 kW"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pression (bar)
                  </label>
                  <input
                    type="number"
                    name="pressure"
                    value={formData.pressure}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Température (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Débit (m³/h)
                  </label>
                  <input
                    type="number"
                    name="flowRate"
                    value={formData.flowRate}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Puissance (kW)
                  </label>
                  <input
                    type="number"
                    name="power"
                    value={formData.power}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tension (V)
                  </label>
                  <input
                    type="number"
                    name="voltage"
                    value={formData.voltage}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Capteurs */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Capteurs</h3>
                <button
                  type="button"
                  onClick={addSensor}
                  className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter un capteur
                </button>
              </div>

              {sensors.map((sensor, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">Capteur {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeSensor(index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Type
                      </label>
                      <select
                        value={sensor.type}
                        onChange={(e) => updateSensor(index, 'type', e.target.value as SensorType)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        {sensorTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        value={sensor.name}
                        onChange={(e) => updateSensor(index, 'name', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Ex: Température entrée"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Unité
                      </label>
                      <input
                        type="text"
                        value={sensor.unit}
                        onChange={(e) => updateSensor(index, 'unit', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Ex: °C"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Valeur actuelle
                      </label>
                      <input
                        type="number"
                        value={sensor.currentValue}
                        onChange={(e) => updateSensor(index, 'currentValue', Number(e.target.value))}
                        step="0.1"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Min
                      </label>
                      <input
                        type="number"
                        value={sensor.minValue}
                        onChange={(e) => updateSensor(index, 'minValue', Number(e.target.value))}
                        step="0.1"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Max
                      </label>
                      <input
                        type="number"
                        value={sensor.maxValue}
                        onChange={(e) => updateSensor(index, 'maxValue', Number(e.target.value))}
                        step="0.1"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Seuil alerte
                      </label>
                      <input
                        type="number"
                        value={sensor.warningThreshold}
                        onChange={(e) => updateSensor(index, 'warningThreshold', Number(e.target.value))}
                        step="0.1"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Seuil critique
                      </label>
                      <input
                        type="number"
                        value={sensor.criticalThreshold}
                        onChange={(e) => updateSensor(index, 'criticalThreshold', Number(e.target.value))}
                        step="0.1"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={sensor.isActive}
                        onChange={(e) => updateSensor(index, 'isActive', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">Capteur actif</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Enregistrement...' : equipment ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
