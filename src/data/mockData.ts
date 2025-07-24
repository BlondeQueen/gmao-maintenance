import { Equipment, SparePart, Alert, KPI, PerformanceData, SystemOverview, MaintenanceRecord } from '../types';

// Données simulées des équipements de production cimentière - Dangote Cement Cameroon Douala
// Usine de production ciment - Capacité 1,5 MT/an - Technologies FLSmidth & Pfeiffer
export const mockEquipments: Equipment[] = [
  {
    id: 'EQ001',
    name: 'Four Rotatif Principal - DCC01',
    type: 'KILN',
    status: 'OPERATIONAL',
    location: 'Ligne de Production Principale - Hall Four Dangote',
    installationDate: new Date('2019-06-15'),
    lastMaintenanceDate: new Date('2024-12-01'),
    nextMaintenanceDate: new Date('2025-08-01'),
    operatingHours: 45240,
    specifications: {
      manufacturer: 'FLSmidth A/S Denmark',
      model: 'UNAX Kiln 4.2x65m - Dangote Standard',
      serialNumber: 'DCC-FL-KLN-2019-001',
      capacity: '5000 t/j clinker (208 t/h)',
      temperature: 1450,
      diameter: 4.2,
      length: 65,
      additionalSpecs: {
        fuelType: 'Charbon pulvérisé + Biomasse (10%)',
        refractory: 'Briques réfractaires Calderys haute alumine',
        prechauffer: '5 étages cyclones ILC',
        clinkerQuality: 'C3S: 65%, C2S: 15%, C3A: 8%, C4AF: 12%'
      }
    },
    sensors: [
      {
        id: 'S001',
        type: 'TEMPERATURE',
        name: 'Température zone de cuisson',
        unit: '°C',
        currentValue: 1435,
        minValue: 1400,
        maxValue: 1500,
        warningThreshold: 1480,
        criticalThreshold: 1490,
        lastReading: new Date(),
        isActive: true
      },
      {
        id: 'S002',
        type: 'PRESSURE',
        name: 'Pression tirage four',
        unit: 'mbar',
        currentValue: -2.5,
        minValue: -5,
        maxValue: 0,
        warningThreshold: -1,
        criticalThreshold: 0.5,
        lastReading: new Date(),
        isActive: true
      }
    ],
    maintenanceHistory: []
  },
  {
    id: 'EQ002',
    name: 'Broyeur à Ciment Principal - DCC02',
    type: 'CEMENT_MILL',
    status: 'WARNING',
    location: 'Atelier Broyage Ciment - Dangote Cement Cameroon',
    installationDate: new Date('2020-03-20'),
    lastMaintenanceDate: new Date('2024-11-15'),
    nextMaintenanceDate: new Date('2025-09-15'),
    operatingHours: 38100,
    specifications: {
      manufacturer: 'Gebr. Pfeiffer SE Germany',
      model: 'MVR 5600 C-4 Dangote Config',
      serialNumber: 'DCC-GP-MVR-2020-002',
      capacity: '120 t/h ciment (2880 t/j)',
      power: 5600,
      diameter: 4.8,
      additionalSpecs: {
        separatorType: 'Séparateur haute efficacité V-SEP 3000',
        finesseBaine: '3200-3800 cm²/g (CEM I 42.5)',
        productTypes: 'CEM I 42.5R, CEM II/B-L 32.5R'
      }
    },
    sensors: [
      {
        id: 'S003',
        type: 'VIBRATION',
        name: 'Vibration palier broyeur',
        unit: 'mm/s',
        currentValue: 8.2,
        minValue: 0,
        maxValue: 15,
        warningThreshold: 10,
        criticalThreshold: 12,
        lastReading: new Date(),
        isActive: true
      },
      {
        id: 'S004',
        type: 'PRESSURE',
        name: 'Pression différentielle séparateur',
        unit: 'mbar',
        currentValue: 45,
        minValue: 30,
        maxValue: 60,
        warningThreshold: 55,
        criticalThreshold: 58,
        lastReading: new Date(),
        isActive: true
      }
    ],
    maintenanceHistory: []
  },
  {
    id: 'EQ003',
    name: 'Concasseur Primaire',
    type: 'CRUSHER',
    status: 'OPERATIONAL',
    location: 'Carrière - Station de Concassage',
    installationDate: new Date('2018-11-10'),
    lastMaintenanceDate: new Date('2024-12-10'),
    nextMaintenanceDate: new Date('2025-10-10'),
    operatingHours: 52500,
    specifications: {
      manufacturer: 'Metso Outotec',
      model: 'C160 Jaw Crusher',
      serialNumber: 'MO-C160-2018-003',
      capacity: '800 t/h calcaire',
      opening: '1600 x 1100 mm',
      power: 315,
      weight: 98
    },
    sensors: [
      {
        id: 'S005',
        type: 'VIBRATION',
        name: 'Vibration châssis concasseur',
        unit: 'mm/s',
        currentValue: 3.8,
        minValue: 0,
        maxValue: 10,
        warningThreshold: 6,
        criticalThreshold: 8,
        lastReading: new Date(),
        isActive: true
      },
      {
        id: 'S006',
        type: 'TEMPERATURE',
        name: 'Température palier excentrique',
        unit: '°C',
        currentValue: 65,
        minValue: 20,
        maxValue: 90,
        warningThreshold: 80,
        criticalThreshold: 85,
        lastReading: new Date(),
        isActive: true
      }
    ],
    maintenanceHistory: []
  },
  {
    id: 'EQ004',
    name: 'Filtre à Manches Principal',
    type: 'BAG_FILTER',
    status: 'CRITICAL',
    location: 'Ligne de Production 1 - Dépoussiérage',
    installationDate: new Date('2021-05-01'),
    lastMaintenanceDate: new Date('2024-10-01'),
    nextMaintenanceDate: new Date('2025-08-15'),
    operatingHours: 28760,
    specifications: {
      manufacturer: 'Intensiv-Filter',
      model: 'IFH 7500-480',
      serialNumber: 'IF-7500-2021-004',
      capacity: '750000 m³/h',
      nbCompartments: 8,
      nbBags: 480,
      additionalSpecs: {
        filterType: 'Manches PTFE membrane',
        emissionLevel: '< 10 mg/Nm³'
      }
    },
    sensors: [
      {
        id: 'S007',
        type: 'PRESSURE',
        name: 'Pression différentielle filtre',
        unit: 'mbar',
        currentValue: 22,
        minValue: 5,
        maxValue: 25,
        warningThreshold: 20,
        criticalThreshold: 23,
        lastReading: new Date(),
        isActive: true
      }
    ],
    maintenanceHistory: []
  },
  {
    id: 'EQ005',
    name: 'Refroidisseur à Clinker',
    type: 'CLINKER_COOLER',
    status: 'OPERATIONAL',
    location: 'Ligne de Production 1 - Refroidissement',
    installationDate: new Date('2019-09-15'),
    lastMaintenanceDate: new Date('2024-11-20'),
    nextMaintenanceDate: new Date('2025-09-20'),
    operatingHours: 43200,
    specifications: {
      manufacturer: 'FLSmidth',
      model: 'Cross-Bar Cooler',
      serialNumber: 'FL-CBC-2019-005',
      capacity: '208 t/h clinker',
      length: 42,
      width: 4.5
    },
    sensors: [
      {
        id: 'S008',
        type: 'TEMPERATURE',
        name: 'Température clinker sortie',
        unit: '°C',
        currentValue: 95,
        minValue: 60,
        maxValue: 120,
        warningThreshold: 110,
        criticalThreshold: 115,
        lastReading: new Date(),
        isActive: true
      }
    ],
    maintenanceHistory: []
  }
];

// Pièces de rechange pour l'industrie cimentière - Dangote Cement Cameroon
export const mockSpareParts: SparePart[] = [
  {
    id: 'SP001',
    name: 'Brique réfractaire four',
    partNumber: 'REF-BR-1450-HC',
    description: 'Brique réfractaire haute alumine pour zone de cuisson four rotatif',
    category: 'Réfractaires',
    supplier: 'RHI Magnesita Cameroun',
    unitCost: 185000,
    currentStock: 250,
    minStock: 100,
    maxStock: 500,
    reorderPoint: 150,
    unit: 'pcs',
    location: 'Magasin Réfractaires - Zone A',
    equipmentCompatibility: ['EQ001'],
    leadTime: 45
  },
  {
    id: 'SP002',
    name: 'Blindage broyeur ciment',
    partNumber: 'BL-CEM-MVR-480',
    description: 'Blindage acier au manganèse pour broyeur à ciment MVR',
    category: 'Blindages et revêtements',
    supplier: 'Magotteaux Cameroun',
    unitCost: 950000,
    currentStock: 12,
    minStock: 8,
    maxStock: 24,
    reorderPoint: 10,
    unit: 'pcs',
    location: 'Magasin Blindages - Zone B',
    equipmentCompatibility: ['EQ002'],
    leadTime: 60
  },
  {
    id: 'SP003',
    name: 'Mâchoire concasseur',
    partNumber: 'JAW-C160-MN18',
    description: 'Mâchoire fixe acier au manganèse pour concasseur C160',
    category: 'Pièces d\'usure',
    supplier: 'Metso Outotec Douala',
    unitCost: 2850000,
    currentStock: 2,
    minStock: 2,
    maxStock: 6,
    reorderPoint: 3,
    unit: 'pcs',
    location: 'Magasin Concassage - Zone C',
    equipmentCompatibility: ['EQ003'],
    leadTime: 90
  },
  {
    id: 'SP004',
    name: 'Manche filtrante PTFE',
    partNumber: 'BAG-PTFE-7500-MB',
    description: 'Manche filtrante PTFE membrane pour filtre à manches',
    category: 'Filtration',
    supplier: 'Intensiv-Filter Yaoundé',
    unitCost: 125000,
    currentStock: 50,
    minStock: 100,
    maxStock: 200,
    reorderPoint: 120,
    unit: 'pcs',
    location: 'Magasin Filtration - Zone D',
    equipmentCompatibility: ['EQ004'],
    leadTime: 30
  },
  {
    id: 'SP005',
    name: 'Grille refroidisseur',
    partNumber: 'GR-COOL-CBC-42',
    description: 'Grille de refroidissement en acier réfractaire',
    category: 'Grilles et plaques',
    supplier: 'FLSmidth Cameroun',
    unitCost: 485000,
    currentStock: 8,
    minStock: 12,
    maxStock: 30,
    reorderPoint: 15,
    unit: 'pcs',
    location: 'Magasin Refroidissement - Zone E',
    equipmentCompatibility: ['EQ005'],
    leadTime: 75
  },
  {
    id: 'SP006',
    name: 'Huile réducteur synthétique',
    partNumber: 'OIL-GEAR-320-20L',
    description: 'Huile synthétique pour réducteurs haute charge - 20 litres',
    category: 'Lubrifiants',
    supplier: 'Total Cameroun',
    unitCost: 95000,
    currentStock: 45,
    minStock: 30,
    maxStock: 80,
    reorderPoint: 35,
    unit: 'L',
    location: 'Magasin Lubrifiants - Zone F',
    equipmentCompatibility: ['EQ001', 'EQ002', 'EQ003'],
    leadTime: 7
  },
  {
    id: 'SP007',
    name: 'Capteur température pyrométrique',
    partNumber: 'PYRO-TEMP-1500C',
    description: 'Capteur de température pyrométrique 0-1500°C four rotatif',
    category: 'Instrumentation',
    supplier: 'Endress+Hauser Douala',
    unitCost: 1250000,
    currentStock: 3,
    minStock: 5,
    maxStock: 15,
    reorderPoint: 6,
    unit: 'pcs',
    location: 'Magasin Instrumentation - Zone G',
    equipmentCompatibility: ['EQ001'],
    leadTime: 45
  },
  {
    id: 'SP008',
    name: 'Valve de régulation air',
    partNumber: 'VLV-AIR-DN200-PN10',
    description: 'Valve papillon de régulation air de combustion DN200',
    category: 'Vannes et robinetterie',
    supplier: 'Belimo Cameroun',
    unitCost: 750000,
    currentStock: 4,
    minStock: 6,
    maxStock: 18,
    reorderPoint: 8,
    unit: 'pcs',
    location: 'Magasin Vannes - Zone H',
    equipmentCompatibility: ['EQ001'],
    leadTime: 60
  },
  {
    id: 'SP009',
    name: 'Courroie transporteuse',
    partNumber: 'BELT-ST2000-10M',
    description: 'Courroie transporteuse ST2000 résistante à la chaleur - 10 mètres',
    category: 'Transport',
    supplier: 'Continental Douala',
    unitCost: 380000,
    currentStock: 15,
    minStock: 20,
    maxStock: 60,
    reorderPoint: 25,
    unit: 'm',
    location: 'Magasin Transport - Zone I',
    equipmentCompatibility: ['EQ001', 'EQ002', 'EQ003', 'EQ004', 'EQ005'],
    leadTime: 21
  },
  {
    id: 'SP010',
    name: 'Roulement haute température',
    partNumber: 'BRG-HT-22334-CCK',
    description: 'Roulement à rouleaux sphériques haute température four rotatif',
    category: 'Roulements',
    supplier: 'SKF Cameroun',
    unitCost: 2150000,
    currentStock: 4,
    minStock: 6,
    maxStock: 18,
    reorderPoint: 8,
    unit: 'pcs',
    location: 'Magasin Roulements - Zone J',
    equipmentCompatibility: ['EQ001'],
    leadTime: 90
  },
  {
    id: 'SP011',
    name: 'Boulet de broyage',
    partNumber: 'BALL-BRY-80MM-CrMo',
    description: 'Boulet de broyage Ø80mm acier chrome-molybdène haute dureté',
    category: 'Corps broyants',
    supplier: 'Shandong Huamin Cameroun',
    unitCost: 35000,
    currentStock: 500,
    minStock: 1000,
    maxStock: 3000,
    reorderPoint: 1200,
    unit: 'pcs',
    location: 'Magasin Corps Broyants - Zone K',
    equipmentCompatibility: ['EQ002'],
    leadTime: 45
  },
  {
    id: 'SP012',
    name: 'Disjoncteur haute tension',
    partNumber: 'CB-6kV-630A-SF6',
    description: 'Disjoncteur 6kV 630A au SF6 pour protection moteur',
    category: 'Électrique haute tension',
    supplier: 'Schneider Electric Cameroun',
    unitCost: 3500000,
    currentStock: 2,
    minStock: 3,
    maxStock: 9,
    reorderPoint: 4,
    unit: 'pcs',
    location: 'Magasin Électrique HT - Zone L',
    equipmentCompatibility: ['EQ002', 'EQ003'],
    leadTime: 120
  }
];

// Alertes actives - Dangote Cement Cameroon
export const mockAlerts: Alert[] = [
  {
    id: 'A001',
    equipmentId: 'EQ004',
    equipmentName: 'Filtre à Manches Principal - DCC',
    type: 'SENSOR_THRESHOLD',
    severity: 'CRITICAL',
    message: 'Pression différentielle critique - Manches INTENSIV-FILTER à remplacer urgence',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // il y a 2h
    acknowledged: false,
    resolved: false,
    sensorId: 'S007',
    value: 22,
    threshold: 23
  },
  {
    id: 'A002',
    equipmentId: 'EQ002',
    equipmentName: 'Broyeur à Ciment Principal - DCC02',
    type: 'MAINTENANCE_DUE',
    severity: 'MEDIUM',
    message: 'Remplacement blindages broyeur Pfeiffer prévu dans 3 jours (Standard Dangote)',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // il y a 24h
    acknowledged: true,
    acknowledgedBy: 'Paul Mbarga',
    acknowledgedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    resolved: false
  },
  {
    id: 'A003',
    equipmentId: 'SP004',
    equipmentName: 'Stock - Manches filtrantes PTFE',
    type: 'LOW_STOCK',
    severity: 'HIGH',
    message: 'Stock critique - Niveau en dessous du seuil de réapprovisionnement',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // il y a 6h
    acknowledged: false,
    resolved: false
  },
  {
    id: 'A004',
    equipmentId: 'EQ001',
    equipmentName: 'Four Rotatif Ligne 1',
    type: 'SENSOR_THRESHOLD',
    severity: 'HIGH',
    message: 'Température de cuisson proche du seuil critique',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // il y a 30min
    acknowledged: false,
    resolved: false,
    sensorId: 'S001',
    value: 1435,
    threshold: 1480
  }
];

// Indicateurs de performance - Production cimentière
export const mockKPIs: KPI[] = [
  {
    id: 'KPI001',
    name: 'Disponibilité Usine Dangote',
    value: 94.2,
    unit: '%',
    target: 95,
    trend: 'UP',
    category: 'AVAILABILITY',
    period: 'MONTHLY',
    lastUpdated: new Date()
  },
  {
    id: 'KPI002',
    name: 'Production Ciment DCC',
    value: 4850,
    unit: 't/j',
    target: 5000,
    trend: 'STABLE',
    category: 'PRODUCTION',
    period: 'DAILY',
    lastUpdated: new Date()
  },
  {
    id: 'KPI003',
    name: 'Coût Maintenance DCC',
    value: 2850000,
    unit: 'FCFA',
    target: 3200000,
    trend: 'DOWN',
    category: 'COST',
    period: 'MONTHLY',
    lastUpdated: new Date()
  },
  {
    id: 'KPI004',
    name: 'OEE Global Dangote Cement',
    value: 89.5,
    unit: '%',
    target: 90,
    trend: 'UP',
    category: 'EFFICIENCY',
    period: 'WEEKLY',
    lastUpdated: new Date()
  },
  {
    id: 'KPI005',
    name: 'Consommation Énergie',
    value: 105,
    unit: 'kWh/t',
    target: 110,
    trend: 'DOWN',
    category: 'ENERGY',
    period: 'DAILY',
    lastUpdated: new Date()
  },
  {
    id: 'KPI006',
    name: 'Qualité Ciment',
    value: 98.7,
    unit: '%',
    target: 98,
    trend: 'UP',
    category: 'QUALITY',
    period: 'MONTHLY',
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
