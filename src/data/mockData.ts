import { Equipment, SparePart, Alert, KPI, PerformanceData, SystemOverview } from '../types';

// Données simulées des équipements du système de refroidissement
export const mockEquipments: Equipment[] = [
  {
    id: 'EQ001',
    name: 'Échangeur Principal',
    type: 'EXCHANGER',
    status: 'OPERATIONAL',
    location: 'Zone A - Salle des machines',
    installationDate: new Date('2020-03-15'),
    lastMaintenanceDate: new Date('2024-12-01'),
    nextMaintenanceDate: new Date('2025-02-01'),
    operatingHours: 15840,
    specifications: {
      manufacturer: 'Alfa Laval',
      model: 'AX-500',
      serialNumber: 'AL500-2020-001',
      capacity: '500 kW',
      pressure: 10,
      temperature: 80,
      flowRate: 120,
      additionalSpecs: {
        materialType: 'Acier inoxydable',
        plateCount: 50
      }
    },
    sensors: [
      {
        id: 'S001',
        type: 'TEMPERATURE',
        name: 'Température entrée huile',
        unit: '°C',
        currentValue: 75,
        minValue: 40,
        maxValue: 90,
        warningThreshold: 80,
        criticalThreshold: 85,
        lastReading: new Date(),
        isActive: true
      },
      {
        id: 'S002',
        type: 'PRESSURE',
        name: 'Pression système',
        unit: 'bar',
        currentValue: 8.5,
        minValue: 5,
        maxValue: 12,
        warningThreshold: 10,
        criticalThreshold: 11,
        lastReading: new Date(),
        isActive: true
      }
    ],
    maintenanceHistory: []
  },
  {
    id: 'EQ002',
    name: 'Tour de Refroidissement Nord',
    type: 'COOLING_TOWER',
    status: 'WARNING',
    location: 'Extérieur - Zone Nord',
    installationDate: new Date('2019-08-20'),
    lastMaintenanceDate: new Date('2024-11-15'),
    nextMaintenanceDate: new Date('2025-01-15'),
    operatingHours: 22100,
    specifications: {
      manufacturer: 'SPX Cooling',
      model: 'TC-1000',
      serialNumber: 'SPX1000-2019-002',
      capacity: '1000 m³/h',
      power: 75,
      voltage: 400
    },
    sensors: [
      {
        id: 'S003',
        type: 'TEMPERATURE',
        name: 'Température eau retour',
        unit: '°C',
        currentValue: 32,
        minValue: 20,
        maxValue: 40,
        warningThreshold: 35,
        criticalThreshold: 38,
        lastReading: new Date(),
        isActive: true
      },
      {
        id: 'S004',
        type: 'FLOW_RATE',
        name: 'Débit eau circulation',
        unit: 'm³/h',
        currentValue: 850,
        minValue: 600,
        maxValue: 1200,
        warningThreshold: 700,
        criticalThreshold: 650,
        lastReading: new Date(),
        isActive: true
      }
    ],
    maintenanceHistory: []
  },
  {
    id: 'EQ003',
    name: 'Pompe Huile Principale',
    type: 'OIL_PUMP',
    status: 'OPERATIONAL',
    location: 'Zone B - Local pompes',
    installationDate: new Date('2021-01-10'),
    lastMaintenanceDate: new Date('2024-12-10'),
    nextMaintenanceDate: new Date('2025-03-10'),
    operatingHours: 12500,
    specifications: {
      manufacturer: 'Grundfos',
      model: 'CR-45-6',
      serialNumber: 'GF456-2021-003',
      capacity: '45 m³/h',
      pressure: 6,
      power: 15,
      voltage: 380
    },
    sensors: [
      {
        id: 'S005',
        type: 'VIBRATION',
        name: 'Vibration pompe',
        unit: 'mm/s',
        currentValue: 2.1,
        minValue: 0,
        maxValue: 10,
        warningThreshold: 4.5,
        criticalThreshold: 7,
        lastReading: new Date(),
        isActive: true
      },
      {
        id: 'S006',
        type: 'PRESSURE',
        name: 'Pression refoulement',
        unit: 'bar',
        currentValue: 5.8,
        minValue: 3,
        maxValue: 8,
        warningThreshold: 7,
        criticalThreshold: 7.5,
        lastReading: new Date(),
        isActive: true
      }
    ],
    maintenanceHistory: []
  },
  {
    id: 'EQ004',
    name: 'Filtre à Huile Principal',
    type: 'OIL_FILTER',
    status: 'CRITICAL',
    location: 'Zone B - Circuit huile',
    installationDate: new Date('2022-05-01'),
    lastMaintenanceDate: new Date('2024-10-01'),
    nextMaintenanceDate: new Date('2025-01-01'),
    operatingHours: 8760,
    specifications: {
      manufacturer: 'Pall Corporation',
      model: 'HH8314F',
      serialNumber: 'PC8314-2022-004',
      capacity: '300 L/min',
      additionalSpecs: {
        filterType: 'Cartouche',
        filtrationLevel: '25 microns'
      }
    },
    sensors: [
      {
        id: 'S007',
        type: 'PRESSURE',
        name: 'Pression différentielle',
        unit: 'bar',
        currentValue: 1.8,
        minValue: 0,
        maxValue: 2.5,
        warningThreshold: 1.5,
        criticalThreshold: 2,
        lastReading: new Date(),
        isActive: true
      }
    ],
    maintenanceHistory: []
  },
  {
    id: 'EQ005',
    name: 'Débitmètre Circuit Principal',
    type: 'FLOW_METER',
    status: 'OPERATIONAL',
    location: 'Zone A - Circuit principal',
    installationDate: new Date('2021-09-15'),
    lastMaintenanceDate: new Date('2024-11-20'),
    nextMaintenanceDate: new Date('2025-02-20'),
    operatingHours: 11200,
    specifications: {
      manufacturer: 'Endress+Hauser',
      model: 'Promag 55S',
      serialNumber: 'EH55S-2021-005',
      capacity: '0-200 m³/h'
    },
    sensors: [
      {
        id: 'S008',
        type: 'FLOW_RATE',
        name: 'Débit principal',
        unit: 'm³/h',
        currentValue: 145,
        minValue: 50,
        maxValue: 200,
        warningThreshold: 180,
        criticalThreshold: 190,
        lastReading: new Date(),
        isActive: true
      }
    ],
    maintenanceHistory: []
  }
];

// Pièces de rechange
export const mockSpareParts: SparePart[] = [
  {
    id: 'SP001',
    name: 'Joint échangeur',
    partNumber: 'AL-JOINT-500',
    description: 'Joint pour échangeur Alfa Laval AX-500',
    category: 'Joints et étanchéité',
    supplier: 'Alfa Laval',
    unitCost: 150,
    currentStock: 5,
    minStock: 2,
    maxStock: 10,
    reorderPoint: 3,
    unit: 'pcs',
    location: 'Magasin A-12',
    equipmentCompatibility: ['EQ001'],
    leadTime: 14
  },
  {
    id: 'SP002',
    name: 'Cartouche filtre huile',
    partNumber: 'PC-8314-CART',
    description: 'Cartouche filtrante 25 microns',
    category: 'Filtration',
    supplier: 'Pall Corporation',
    unitCost: 85,
    currentStock: 2,
    minStock: 3,
    maxStock: 15,
    reorderPoint: 4,
    unit: 'pcs',
    location: 'Magasin B-08',
    equipmentCompatibility: ['EQ004'],
    leadTime: 7
  },
  {
    id: 'SP003',
    name: 'Roulement pompe',
    partNumber: 'GF-BEARING-456',
    description: 'Roulement pour pompe Grundfos CR-45-6',
    category: 'Mécanique',
    supplier: 'Grundfos',
    unitCost: 200,
    currentStock: 4,
    minStock: 2,
    maxStock: 8,
    reorderPoint: 3,
    unit: 'pcs',
    location: 'Magasin C-05',
    equipmentCompatibility: ['EQ003'],
    leadTime: 10
  }
];

// Alertes actives
export const mockAlerts: Alert[] = [
  {
    id: 'A001',
    equipmentId: 'EQ004',
    equipmentName: 'Filtre à Huile Principal',
    type: 'SENSOR_THRESHOLD',
    severity: 'CRITICAL',
    message: 'Pression différentielle critique - Remplacement du filtre requis',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // il y a 2h
    acknowledged: false,
    resolved: false,
    sensorId: 'S007',
    value: 1.8,
    threshold: 2
  },
  {
    id: 'A002',
    equipmentId: 'EQ002',
    equipmentName: 'Tour de Refroidissement Nord',
    type: 'MAINTENANCE_DUE',
    severity: 'MEDIUM',
    message: 'Maintenance préventive due dans 2 jours',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // il y a 24h
    acknowledged: true,
    acknowledgedBy: 'Jean Dupont',
    acknowledgedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    resolved: false
  },
  {
    id: 'A003',
    equipmentId: 'SP002',
    equipmentName: 'Stock - Cartouche filtre huile',
    type: 'LOW_STOCK',
    severity: 'HIGH',
    message: 'Stock critique - Niveau en dessous du point de réapprovisionnement',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // il y a 6h
    acknowledged: false,
    resolved: false
  }
];

// Indicateurs de performance
export const mockKPIs: KPI[] = [
  {
    id: 'KPI001',
    name: 'Disponibilité Système',
    value: 95.8,
    unit: '%',
    target: 96,
    trend: 'DOWN',
    category: 'AVAILABILITY',
    period: 'MONTHLY',
    lastUpdated: new Date()
  },
  {
    id: 'KPI002',
    name: 'MTBF Moyen',
    value: 720,
    unit: 'heures',
    target: 800,
    trend: 'UP',
    category: 'RELIABILITY',
    period: 'MONTHLY',
    lastUpdated: new Date()
  },
  {
    id: 'KPI003',
    name: 'Coût Maintenance',
    value: 15420,
    unit: '€',
    target: 18000,
    trend: 'STABLE',
    category: 'COST',
    period: 'MONTHLY',
    lastUpdated: new Date()
  },
  {
    id: 'KPI004',
    name: 'OEE Global',
    value: 87.2,
    unit: '%',
    target: 85,
    trend: 'UP',
    category: 'EFFICIENCY',
    period: 'WEEKLY',
    lastUpdated: new Date()
  }
];

// Données de performance pour les graphiques
export const mockPerformanceData: PerformanceData[] = Array.from({ length: 30 }, (_, i) => ({
  timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
  equipmentId: 'SYSTEM',
  metrics: {
    availability: 94 + Math.random() * 4,
    efficiency: 85 + Math.random() * 10,
    oee: 80 + Math.random() * 15,
    mtbf: 650 + Math.random() * 200,
    mttr: 2 + Math.random() * 3
  }
}));

// Vue d'ensemble du système
export const mockSystemOverview: SystemOverview = {
  totalEquipment: 5,
  operationalEquipment: 3,
  equipmentInMaintenance: 1,
  criticalAlerts: 1,
  pendingMaintenanceOrders: 3,
  systemEfficiency: 87.2,
  totalOperatingHours: 70400,
  lastSystemCheck: new Date()
};
