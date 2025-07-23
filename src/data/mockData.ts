import { Equipment, SparePart, Alert, KPI, PerformanceData, SystemOverview, MaintenanceRecord } from '../types';

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
    supplier: 'Alfa Laval Cameroun',
    unitCost: 92000,
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
    supplier: 'Pall Corporation Douala',
    unitCost: 52000,
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
    supplier: 'Grundfos Yaoundé',
    unitCost: 122000,
    currentStock: 4,
    minStock: 2,
    maxStock: 8,
    reorderPoint: 3,
    unit: 'pcs',
    location: 'Magasin C-05',
    equipmentCompatibility: ['EQ003'],
    leadTime: 10
  },
  {
    id: 'SP004',
    name: 'Joint étanchéité',
    partNumber: 'JS-ETH-789',
    description: 'Joint d\'étanchéité en caoutchouc NBR',
    category: 'Joints et étanchéité',
    supplier: 'Hutchinson Cameroun',
    unitCost: 28000,
    currentStock: 8,
    minStock: 5,
    maxStock: 20,
    reorderPoint: 6,
    unit: 'pcs',
    location: 'Magasin A-15',
    equipmentCompatibility: ['EQ003', 'EQ004'],
    leadTime: 5
  },
  {
    id: 'SP005',
    name: 'Courroie transmission',
    partNumber: 'CT-BELT-456',
    description: 'Courroie trapézoïdale section A',
    category: 'Transmission',
    supplier: 'Gates Douala',
    unitCost: 36000,
    currentStock: 3,
    minStock: 4,
    maxStock: 12,
    reorderPoint: 5,
    unit: 'pcs',
    location: 'Magasin B-12',
    equipmentCompatibility: ['EQ005'],
    leadTime: 8
  },
  {
    id: 'SP006',
    name: 'Huile hydraulique',
    partNumber: 'HH-ISO46-20L',
    description: 'Huile hydraulique ISO VG 46 - 20 litres',
    category: 'Lubrifiants',
    supplier: 'Total Cameroun',
    unitCost: 45000,
    currentStock: 12,
    minStock: 8,
    maxStock: 30,
    reorderPoint: 10,
    unit: 'L',
    location: 'Magasin D-01',
    equipmentCompatibility: ['EQ001', 'EQ002', 'EQ003'],
    leadTime: 3
  },
  {
    id: 'SP007',
    name: 'Capteur température',
    partNumber: 'CAP-TEMP-PT100',
    description: 'Capteur de température PT100 avec gaine inox',
    category: 'Instrumentation',
    supplier: 'Siemens Yaoundé',
    unitCost: 185000,
    currentStock: 2,
    minStock: 3,
    maxStock: 10,
    reorderPoint: 4,
    unit: 'pcs',
    location: 'Magasin E-08',
    equipmentCompatibility: ['EQ001', 'EQ002'],
    leadTime: 21
  },
  {
    id: 'SP008',
    name: 'Valve de régulation',
    partNumber: 'VR-DN50-PN16',
    description: 'Valve de régulation automatique DN50 PN16',
    category: 'Vannes et robinetterie',
    supplier: 'KSB Cameroun',
    unitCost: 320000,
    currentStock: 1,
    minStock: 2,
    maxStock: 6,
    reorderPoint: 2,
    unit: 'pcs',
    location: 'Magasin C-18',
    equipmentCompatibility: ['EQ001'],
    leadTime: 28
  },
  {
    id: 'SP009',
    name: 'Cable électrique',
    partNumber: 'CE-4G2.5-100M',
    description: 'Câble électrique 4G2.5mm² - 100 mètres',
    category: 'Électrique',
    supplier: 'Nexans Douala',
    unitCost: 95000,
    currentStock: 5,
    minStock: 3,
    maxStock: 15,
    reorderPoint: 4,
    unit: 'm',
    location: 'Magasin F-06',
    equipmentCompatibility: ['EQ001', 'EQ002', 'EQ003', 'EQ004', 'EQ005'],
    leadTime: 7
  },
  {
    id: 'SP010',
    name: 'Fusible protection',
    partNumber: 'FUS-10A-gG',
    description: 'Fusible gG 10A pour protection moteur',
    category: 'Électrique',
    supplier: 'Schneider Electric Cameroun',
    unitCost: 8500,
    currentStock: 15,
    minStock: 10,
    maxStock: 50,
    reorderPoint: 12,
    unit: 'pcs',
    location: 'Magasin F-02',
    equipmentCompatibility: ['EQ003', 'EQ004', 'EQ005'],
    leadTime: 2
  },
  {
    id: 'SP011',
    name: 'Graisse roulement',
    partNumber: 'GR-NLGI2-1KG',
    description: 'Graisse pour roulements NLGI 2 - 1kg',
    category: 'Lubrifiants',
    supplier: 'Mobil Cameroun',
    unitCost: 22000,
    currentStock: 8,
    minStock: 5,
    maxStock: 20,
    reorderPoint: 6,
    unit: 'kg',
    location: 'Magasin D-03',
    equipmentCompatibility: ['EQ003', 'EQ004', 'EQ005'],
    leadTime: 5
  },
  {
    id: 'SP012',
    name: 'Contacteur électrique',
    partNumber: 'CONT-LC1D18',
    description: 'Contacteur 3P 18A 230V bobine 24V',
    category: 'Électrique',
    supplier: 'Schneider Electric Cameroun',
    unitCost: 67000,
    currentStock: 4,
    minStock: 3,
    maxStock: 12,
    reorderPoint: 4,
    unit: 'pcs',
    location: 'Magasin F-05',
    equipmentCompatibility: ['EQ003', 'EQ004'],
    leadTime: 14
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

// Données simulées des ordres de maintenance
export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: 'MT001',
    equipmentId: 'EQ001',
    type: 'PREVENTIVE',
    status: 'SCHEDULED',
    scheduledDate: new Date('2024-12-20'),
    technician: 'Jean Dupont',
    description: 'Maintenance préventive échangeur principal',
    workOrder: 'WO-2024-001',
    duration: 4,
    cost: 350,
    partsUsed: [],
    priority: 'MEDIUM',
    notes: 'Nettoyage et vérification des plaques'
  },
  {
    id: 'MT002',
    equipmentId: 'EQ002',
    type: 'CORRECTIVE',
    status: 'IN_PROGRESS',
    scheduledDate: new Date('2024-12-18'),
    actualDate: new Date('2024-12-18'),
    technician: 'Marie Martin',
    description: 'Réparation pompe eau de refroidissement',
    workOrder: 'WO-2024-002',
    duration: 6,
    cost: 580,
    partsUsed: [
      {
        partId: 'SP001',
        partName: 'Joint d\'étanchéité',
        quantity: 2,
        unitCost: 45,
        totalCost: 90
      }
    ],
    priority: 'HIGH',
    notes: 'Fuite détectée sur joint principal'
  },
  {
    id: 'MT003',
    equipmentId: 'EQ003',
    type: 'INSPECTION',
    status: 'COMPLETED',
    scheduledDate: new Date('2024-12-15'),
    actualDate: new Date('2024-12-15'),
    completedDate: new Date('2024-12-15'),
    technician: 'Pierre Durand',
    description: 'Inspection mensuelle filtre à huile',
    workOrder: 'WO-2024-003',
    duration: 2,
    cost: 120,
    partsUsed: [],
    priority: 'LOW',
    notes: 'Filtre en bon état, changement prévu dans 2 mois'
  },
  {
    id: 'MT004',
    equipmentId: 'EQ001',
    type: 'EMERGENCY',
    status: 'SCHEDULED',
    scheduledDate: new Date('2024-12-22'),
    technician: 'Jean Dupont',
    description: 'Arrêt d\'urgence - surchauffe détectée',
    workOrder: 'WO-2024-004',
    duration: 8,
    cost: 850,
    partsUsed: [],
    priority: 'CRITICAL',
    notes: 'Intervention urgente requise'
  },
  {
    id: 'MT005',
    equipmentId: 'EQ004',
    type: 'PREDICTIVE',
    status: 'SCHEDULED',
    scheduledDate: new Date('2024-12-25'),
    technician: 'Marie Martin',
    description: 'Maintenance prédictive tour de refroidissement',
    workOrder: 'WO-2024-005',
    duration: 5,
    cost: 420,
    partsUsed: [],
    priority: 'MEDIUM',
    notes: 'Analyse vibratoire programmée'
  },
  {
    id: 'MT006',
    equipmentId: 'EQ002',
    type: 'PREVENTIVE',
    status: 'SCHEDULED',
    scheduledDate: new Date('2024-12-28'),
    technician: 'Pierre Durand',
    description: 'Vidange et changement filtres',
    workOrder: 'WO-2024-006',
    duration: 3,
    cost: 280,
    partsUsed: [],
    priority: 'LOW',
    notes: 'Maintenance trimestrielle'
  },
  {
    id: 'MR001',
    equipmentId: 'EQ001',
    type: 'PREVENTIVE',
    status: 'SCHEDULED',
    scheduledDate: new Date('2025-01-30T09:00:00'),
    technician: 'Paul Mbarga',
    description: 'Maintenance préventive trimestrielle - Nettoyage plaques échangeur',
    workOrder: 'WO-2025-001',
    duration: 4,
    cost: 153000,
    partsUsed: [],
    priority: 'MEDIUM'
  },
  {
    id: 'MR002',
    equipmentId: 'EQ002',
    type: 'CORRECTIVE',
    status: 'COMPLETED',
    scheduledDate: new Date('2025-01-20T14:00:00'),
    actualDate: new Date('2025-01-20T14:30:00'),
    completedDate: new Date('2025-01-20T16:30:00'),
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
    id: 'MR003',
    equipmentId: 'EQ003',
    type: 'PREDICTIVE',
    status: 'COMPLETED',
    scheduledDate: new Date('2025-01-18T08:00:00'),
    actualDate: new Date('2025-01-18T08:15:00'),
    completedDate: new Date('2025-01-18T11:00:00'),
    technician: 'Emmanuel Biya',
    description: 'Contrôle vibratoire et alignement pompe',
    workOrder: 'WO-2025-003',
    duration: 3,
    cost: 196000,
    partsUsed: [],
    priority: 'MEDIUM',
    notes: 'Vibrations dans les normes, alignement OK'
  },
  {
    id: 'MR004',
    equipmentId: 'EQ004',
    type: 'EMERGENCY',
    status: 'IN_PROGRESS',
    scheduledDate: new Date('2025-01-23T16:00:00'),
    actualDate: new Date('2025-01-23T16:00:00'),
    technician: 'Marie-Claire Ondoa',
    description: 'Fuite importante sur pompe auxiliaire - Intervention d\'urgence',
    workOrder: 'WO-2025-004',
    duration: 6,
    cost: 545000,
    partsUsed: [
      { partId: 'SP003', partName: 'Joint étanchéité', quantity: 2, unitCost: 28000, totalCost: 56000 },
      { partId: 'SP004', partName: 'Roulement SKF', quantity: 1, unitCost: 73000, totalCost: 73000 }
    ],
    priority: 'CRITICAL',
    failureMode: 'Défaillance joint',
    rootCause: 'Usure prématurée due à vibrations'
  },
  {
    id: 'MR005',
    equipmentId: 'EQ005',
    type: 'INSPECTION',
    status: 'SCHEDULED',
    scheduledDate: new Date('2025-02-05T10:00:00'),
    technician: 'Jean-Baptiste Fouda',
    description: 'Inspection réglementaire annuelle - Contrôle sécurité',
    workOrder: 'WO-2025-005',
    duration: 2,
    cost: 92000,
    partsUsed: [],
    priority: 'HIGH'
  }
];
