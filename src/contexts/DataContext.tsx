'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Equipment, SparePart, MaintenanceRecord } from '../types';
import { mockEquipments, mockSpareParts, mockMaintenanceRecords } from '../data/mockData';

// Types pour les actions du reducer
type DataAction =
  | { type: 'LOAD_DATA'; payload: DataState }
  | { type: 'ADD_INTERVENTION'; payload: MaintenanceRecord }
  | { type: 'UPDATE_INTERVENTION'; payload: MaintenanceRecord }
  | { type: 'DELETE_INTERVENTION'; payload: string }
  | { type: 'ADD_PART'; payload: SparePart }
  | { type: 'UPDATE_PART'; payload: SparePart }
  | { type: 'DELETE_PART'; payload: string }
  | { type: 'ADD_EQUIPMENT'; payload: Equipment }
  | { type: 'UPDATE_EQUIPMENT'; payload: Equipment }
  | { type: 'DELETE_EQUIPMENT'; payload: string };

// État global des données
interface DataState {
  equipments: Equipment[];
  spareParts: SparePart[];
  maintenanceRecords: MaintenanceRecord[];
  isLoaded: boolean;
}

// State initial
const initialState: DataState = {
  equipments: [],
  spareParts: [],
  maintenanceRecords: [],
  isLoaded: false
};

// Reducer pour gérer les actions
function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...action.payload,
        isLoaded: true
      };

    case 'ADD_INTERVENTION':
      return {
        ...state,
        maintenanceRecords: [...state.maintenanceRecords, action.payload]
      };

    case 'UPDATE_INTERVENTION':
      return {
        ...state,
        maintenanceRecords: state.maintenanceRecords.map(record =>
          record.id === action.payload.id ? action.payload : record
        )
      };

    case 'DELETE_INTERVENTION':
      return {
        ...state,
        maintenanceRecords: state.maintenanceRecords.filter(record => record.id !== action.payload)
      };

    case 'ADD_PART':
      return {
        ...state,
        spareParts: [...state.spareParts, action.payload]
      };

    case 'UPDATE_PART':
      return {
        ...state,
        spareParts: state.spareParts.map(part =>
          part.id === action.payload.id ? action.payload : part
        )
      };

    case 'DELETE_PART':
      return {
        ...state,
        spareParts: state.spareParts.filter(part => part.id !== action.payload)
      };

    case 'ADD_EQUIPMENT':
      return {
        ...state,
        equipments: [...state.equipments, action.payload]
      };

    case 'UPDATE_EQUIPMENT':
      return {
        ...state,
        equipments: state.equipments.map(equipment =>
          equipment.id === action.payload.id ? action.payload : equipment
        )
      };

    case 'DELETE_EQUIPMENT':
      return {
        ...state,
        equipments: state.equipments.filter(equipment => equipment.id !== action.payload)
      };

    default:
      return state;
  }
}

// Interface du contexte
interface DataContextType {
  state: DataState;
  addIntervention: (intervention: MaintenanceRecord | Omit<MaintenanceRecord, 'id'>) => void;
  updateIntervention: (intervention: MaintenanceRecord) => void;
  deleteIntervention: (id: string) => void;
  addPart: (part: Omit<SparePart, 'id'>) => void;
  updatePart: (part: SparePart) => void;
  deletePart: (id: string) => void;
  addEquipment: (equipment: Omit<Equipment, 'id'>) => void;
  updateEquipment: (equipment: Equipment) => void;
  deleteEquipment: (id: string) => void;
  saveData: () => void;
  loadData: () => void;
}

// Création du contexte
const DataContext = createContext<DataContextType | undefined>(undefined);

// Clés pour le localStorage
const STORAGE_KEYS = {
  EQUIPMENTS: 'gmao_equipments',
  SPARE_PARTS: 'gmao_spare_parts',
  MAINTENANCE_RECORDS: 'gmao_maintenance_records'
};

// Provider du contexte
export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Chargement des données depuis le localStorage ou les données mock
  const loadData = () => {
    // Vérifier que nous sommes côté client
    if (typeof window === 'undefined') {
      return;
    }

    try {
      console.log('Chargement des données depuis localStorage...');
      const savedEquipments = localStorage.getItem(STORAGE_KEYS.EQUIPMENTS);
      const savedParts = localStorage.getItem(STORAGE_KEYS.SPARE_PARTS);
      const savedRecords = localStorage.getItem(STORAGE_KEYS.MAINTENANCE_RECORDS);

      console.log('Données trouvées:', {
        equipments: !!savedEquipments,
        parts: !!savedParts,
        records: !!savedRecords
      });

      const loadedData: DataState = {
        equipments: savedEquipments ? JSON.parse(savedEquipments) : mockEquipments,
        spareParts: savedParts ? JSON.parse(savedParts) : mockSpareParts,
        maintenanceRecords: savedRecords ? JSON.parse(savedRecords) : mockMaintenanceRecords,
        isLoaded: true
      };

      // Reconvertir les dates si nécessaire
      loadedData.equipments = loadedData.equipments.map(equipment => ({
        ...equipment,
        installationDate: new Date(equipment.installationDate),
        lastMaintenanceDate: equipment.lastMaintenanceDate ? new Date(equipment.lastMaintenanceDate) : undefined,
        nextMaintenanceDate: equipment.nextMaintenanceDate ? new Date(equipment.nextMaintenanceDate) : undefined
      }));

      loadedData.maintenanceRecords = loadedData.maintenanceRecords.map(record => ({
        ...record,
        scheduledDate: new Date(record.scheduledDate),
        completedDate: record.completedDate ? new Date(record.completedDate) : undefined,
        createdAt: record.createdAt ? new Date(record.createdAt) : new Date(),
        updatedAt: record.updatedAt ? new Date(record.updatedAt) : new Date()
      }));

      loadedData.spareParts = loadedData.spareParts.map(part => ({
        ...part,
        lastOrderDate: part.lastOrderDate ? new Date(part.lastOrderDate) : undefined,
        createdAt: part.createdAt ? new Date(part.createdAt) : new Date(),
        updatedAt: part.updatedAt ? new Date(part.updatedAt) : new Date()
      }));

      console.log('Données chargées avec succès:', loadedData);
      dispatch({ type: 'LOAD_DATA', payload: loadedData });
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      // En cas d'erreur, charger les données mock
      console.log('Chargement des données mock par défaut');
      dispatch({ 
        type: 'LOAD_DATA', 
        payload: {
          equipments: mockEquipments,
          spareParts: mockSpareParts,
          maintenanceRecords: mockMaintenanceRecords,
          isLoaded: true
        }
      });
    }
  };

  // Sauvegarde des données dans le localStorage
  const saveData = React.useCallback(() => {
    // Vérifier que nous sommes côté client
    if (typeof window === 'undefined') {
      return;
    }

    try {
      console.log('Sauvegarde des données dans localStorage...');
      localStorage.setItem(STORAGE_KEYS.EQUIPMENTS, JSON.stringify(state.equipments));
      localStorage.setItem(STORAGE_KEYS.SPARE_PARTS, JSON.stringify(state.spareParts));
      localStorage.setItem(STORAGE_KEYS.MAINTENANCE_RECORDS, JSON.stringify(state.maintenanceRecords));
      console.log('Données sauvegardées avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }
  }, [state.equipments, state.spareParts, state.maintenanceRecords]);

  // Fonctions pour les interventions
  const addIntervention = (interventionData: MaintenanceRecord | Omit<MaintenanceRecord, 'id'>) => {
    console.log('Ajout intervention:', interventionData);
    
    const intervention: MaintenanceRecord = 'id' in interventionData && interventionData.id
      ? interventionData as MaintenanceRecord
      : {
          ...interventionData,
          id: `INT-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
    
    console.log('Intervention créée:', intervention);
    dispatch({ type: 'ADD_INTERVENTION', payload: intervention });
  };

  const updateIntervention = (intervention: MaintenanceRecord) => {
    const updatedIntervention = {
      ...intervention,
      updatedAt: new Date()
    };
    dispatch({ type: 'UPDATE_INTERVENTION', payload: updatedIntervention });
  };

  const deleteIntervention = (id: string) => {
    dispatch({ type: 'DELETE_INTERVENTION', payload: id });
  };

  // Fonctions pour les pièces de rechange
  const addPart = (partData: Omit<SparePart, 'id'>) => {
    const part: SparePart = {
      ...partData,
      id: `PART-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dispatch({ type: 'ADD_PART', payload: part });
  };

  const updatePart = (part: SparePart) => {
    const updatedPart = {
      ...part,
      updatedAt: new Date()
    };
    dispatch({ type: 'UPDATE_PART', payload: updatedPart });
  };

  const deletePart = (id: string) => {
    dispatch({ type: 'DELETE_PART', payload: id });
  };

  // Fonctions pour les équipements
  const addEquipment = (equipmentData: Omit<Equipment, 'id'>) => {
    const equipment: Equipment = {
      ...equipmentData,
      id: `EQ-${Date.now()}`
    };
    dispatch({ type: 'ADD_EQUIPMENT', payload: equipment });
  };

  const updateEquipment = (equipment: Equipment) => {
    dispatch({ type: 'UPDATE_EQUIPMENT', payload: equipment });
  };

  const deleteEquipment = (id: string) => {
    dispatch({ type: 'DELETE_EQUIPMENT', payload: id });
  };

  // Chargement automatique des données au montage côté client uniquement
  useEffect(() => {
    if (typeof window !== 'undefined' && !state.isLoaded) {
      console.log('Initialisation côté client...');
      loadData();
    }
  }, [state.isLoaded]);

  // Sauvegarde automatique à chaque changement d'état
  useEffect(() => {
    if (state.isLoaded) {
      saveData();
    }
  }, [state.equipments, state.spareParts, state.maintenanceRecords, state.isLoaded, saveData]);

  const value: DataContextType = {
    state,
    addIntervention,
    updateIntervention,
    deleteIntervention,
    addPart,
    updatePart,
    deletePart,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    saveData,
    loadData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

// Hook pour utiliser le contexte
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
