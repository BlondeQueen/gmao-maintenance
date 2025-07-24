// Utilitaires pour convertir entre les types de formulaires et les types de données

import { MaintenanceRecord, MaintenanceType, Priority, MaintenanceStatus } from '../types';

// Interface pour les données d'intervention du formulaire
export interface InterventionFormData {
  id?: string;
  title: string;
  description?: string;
  equipmentId: string;
  technician: string;
  startDate: string;
  endDate?: string;
  priority: string;
  type: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Conversion des données du formulaire vers MaintenanceRecord
export function convertInterventionToMaintenanceRecord(
  intervention: InterventionFormData,
  existingRecord?: MaintenanceRecord
): MaintenanceRecord {
  const now = new Date();
  
  return {
    id: intervention.id || `INT-${Date.now()}`,
    equipmentId: intervention.equipmentId,
    type: intervention.type as MaintenanceType,
    status: (intervention.status as MaintenanceStatus) || 'SCHEDULED',
    scheduledDate: new Date(intervention.startDate),
    completedDate: intervention.endDate ? new Date(intervention.endDate) : undefined,
    technician: intervention.technician,
    description: intervention.description || intervention.title,
    workOrder: `WO-${intervention.id || Date.now()}`,
    duration: intervention.endDate 
      ? Math.round((new Date(intervention.endDate).getTime() - new Date(intervention.startDate).getTime()) / (1000 * 60 * 60))
      : 8, // 8 heures par défaut
    cost: 0, // À définir selon les besoins
    partsUsed: [], // Sera défini lors de l'exécution
    priority: intervention.priority as Priority,
    notes: intervention.description,
    createdAt: existingRecord?.createdAt || now,
    updatedAt: now
  };
}

// Conversion d'un MaintenanceRecord vers les données du formulaire
export function convertMaintenanceRecordToIntervention(record: MaintenanceRecord): InterventionFormData {
  return {
    id: record.id,
    title: record.description,
    description: record.notes || record.description,
    equipmentId: record.equipmentId,
    technician: record.technician,
    startDate: record.scheduledDate.toISOString().slice(0, 16), // Format datetime-local
    endDate: record.completedDate?.toISOString().slice(0, 16),
    priority: record.priority,
    type: record.type,
    status: record.status,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };
}

// Interface pour les données de pièce de rechange du formulaire
export interface PartFormData {
  id?: string;
  name: string;
  partNumber: string;
  description: string;
  category: string;
  supplier: string;
  unitCost: number;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  unit: string;
  location: string;
  equipmentCompatibility: string[];
  leadTime: number;
}

// Conversion des données du formulaire de pièce vers SparePart
export function convertPartFormToSparePart(partData: PartFormData): import('../types').SparePart {
  const now = new Date();
  
  return {
    id: partData.id || `PART-${Date.now()}`,
    name: partData.name,
    partNumber: partData.partNumber,
    description: partData.description,
    category: partData.category,
    supplier: partData.supplier,
    unitCost: partData.unitCost,
    currentStock: partData.currentStock,
    minStock: partData.minStock,
    maxStock: partData.maxStock,
    reorderPoint: partData.reorderPoint,
    unit: partData.unit,
    location: partData.location,
    equipmentCompatibility: partData.equipmentCompatibility,
    leadTime: partData.leadTime,
    createdAt: now,
    updatedAt: now
  };
}
