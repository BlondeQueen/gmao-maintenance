// Types pour le système GMAO - Dangote Cement Cameroon

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  status: EquipmentStatus;
  location: string;
  installationDate: Date;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  operatingHours: number;
  specifications: EquipmentSpecifications;
  sensors: Sensor[];
  maintenanceHistory: MaintenanceRecord[];
}

export type EquipmentType = 
  | 'KILN'           // Four rotatif
  | 'CEMENT_MILL'    // Broyeur à ciment
  | 'RAW_MILL'       // Broyeur à cru
  | 'CRUSHER'        // Concasseur
  | 'BAG_FILTER'     // Filtre à manches
  | 'CLINKER_COOLER' // Refroidisseur à clinker
  | 'CONVEYOR'       // Convoyeur
  | 'ELEVATOR'       // Élévateur
  | 'SILO'           // Silo
  | 'PACKER'         // Ensacheuse
  | 'SEPARATOR'      // Séparateur
  | 'COMPRESSOR'     // Compresseur
  | 'EXCHANGER'      // Échangeur (legacy)
  | 'COOLING_TOWER'  // Tours de refroidissement (legacy)
  | 'WATER_FILTER'   // Filtres à eau (legacy)
  | 'OIL_FILTER'     // Filtre à huiles (legacy)
  | 'WATER_PUMP'     // Pompes eau (legacy)
  | 'OIL_PUMP'       // Pompes huile (legacy)
  | 'SENSOR'         // Capteurs (legacy)
  | 'FLOW_METER';    // Débitmètre (legacy)

export type EquipmentStatus = 
  | 'OPERATIONAL'    // Opérationnel
  | 'WARNING'        // Avertissement
  | 'CRITICAL'       // Critique
  | 'MAINTENANCE'    // En maintenance
  | 'OUT_OF_SERVICE'; // Hors service

export interface EquipmentSpecifications {
  manufacturer: string;
  model: string;
  serialNumber: string;
  capacity?: string;
  pressure?: number;
  temperature?: number;
  flowRate?: number;
  power?: number;
  voltage?: number;
  diameter?: number;        // Diamètre (four, broyeur)
  length?: number;          // Longueur (four, refroidisseur)
  width?: number;           // Largeur (refroidisseur)
  opening?: string;         // Ouverture (concasseur)
  nbCompartments?: number;  // Nb compartiments (filtre)
  nbBags?: number;          // Nb manches (filtre)
  weight?: number;          // Poids (équipement)
  additionalSpecs?: Record<string, string | number | boolean>;
}

export interface Sensor {
  id: string;
  type: SensorType;
  name: string;
  unit: string;
  currentValue: number;
  minValue: number;
  maxValue: number;
  warningThreshold: number;
  criticalThreshold: number;
  lastReading: Date;
  isActive: boolean;
}

export type SensorType = 
  | 'TEMPERATURE'
  | 'PRESSURE'
  | 'FLOW_RATE'
  | 'VIBRATION'
  | 'PH_LEVEL'
  | 'CONDUCTIVITY'
  | 'TURBIDITY';

export interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  type: MaintenanceType;
  status: MaintenanceStatus;
  scheduledDate: Date;
  actualDate?: Date;
  completedDate?: Date;
  technician: string;
  description: string;
  workOrder: string;
  duration: number; // en heures
  cost: number;
  partsUsed: PartUsed[];
  notes?: string;
  priority: Priority;
  failureMode?: string;
  rootCause?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MaintenanceType = 
  | 'PREVENTIVE'     // Préventive
  | 'CORRECTIVE'     // Corrective
  | 'PREDICTIVE'     // Prédictive
  | 'EMERGENCY'      // Urgence
  | 'INSPECTION';    // Inspection

export type MaintenanceStatus = 
  | 'SCHEDULED'      // Planifiée
  | 'IN_PROGRESS'    // En cours
  | 'COMPLETED'      // Terminée
  | 'CANCELLED'      // Annulée
  | 'PENDING'        // En attente
  | 'OVERDUE';       // En retard

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface PartUsed {
  partId: string;
  partName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface SparePart {
  id: string;
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
  lastOrderDate?: Date;
  leadTime: number; // jours
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  unit: string;
  target?: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  category: KPICategory;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  lastUpdated: Date;
}

export type KPICategory = 
  | 'AVAILABILITY'   // Disponibilité
  | 'RELIABILITY'    // Fiabilité
  | 'EFFICIENCY'     // Efficacité
  | 'COST'          // Coût
  | 'SAFETY'        // Sécurité
  | 'PRODUCTION'    // Production
  | 'ENERGY'        // Énergie
  | 'QUALITY';      // Qualité

export interface Alert {
  id: string;
  equipmentId: string;
  equipmentName: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  sensorId?: string;
  value?: number;
  threshold?: number;
}

export type AlertType = 
  | 'SENSOR_THRESHOLD'
  | 'MAINTENANCE_DUE'
  | 'EQUIPMENT_FAILURE'
  | 'LOW_STOCK'
  | 'SYSTEM_ERROR';

export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface MaintenanceCalendar {
  id: string;
  title: string;
  equipmentId: string;
  equipmentName: string;
  type: MaintenanceType;
  start: Date;
  end: Date;
  status: MaintenanceStatus;
  technician: string;
  priority: Priority;
  description?: string;
}

export interface PerformanceData {
  timestamp: Date;
  equipmentId: string;
  metrics: {
    availability: number;
    efficiency: number;
    oee: number; // Overall Equipment Effectiveness
    mtbf: number; // Mean Time Between Failures
    mttr: number; // Mean Time To Repair
  };
}

export interface SystemOverview {
  totalEquipment: number;
  operationalEquipment: number;
  equipmentInMaintenance: number;
  criticalAlerts: number;
  pendingMaintenanceOrders: number;
  systemEfficiency: number;
  totalOperatingHours: number;
  lastSystemCheck: Date;
}
