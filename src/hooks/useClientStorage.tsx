'use client';

import { useState, useEffect } from 'react';

// Hook pour la persistance côté client seulement
export function useClientStorage<T>(key: string, defaultValue: T) {
  // État avec valeur par défaut
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Chargement initial côté client uniquement
  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoaded) {
      try {
        const saved = localStorage.getItem(key);
        if (saved) {
          const parsed = JSON.parse(saved);
          console.log(`Chargé depuis localStorage [${key}]:`, parsed);
          setValue(parsed);
        } else {
          console.log(`Aucune donnée trouvée pour [${key}], utilisation valeur par défaut`);
        }
      } catch (error) {
        console.error(`Erreur lors du chargement [${key}]:`, error);
      } finally {
        setIsLoaded(true);
      }
    }
  }, [key, defaultValue, isLoaded]);

  // Sauvegarde à chaque modification (côté client uniquement)
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        console.log(`Sauvegardé dans localStorage [${key}]:`, value);
      } catch (error) {
        console.error(`Erreur lors de la sauvegarde [${key}]:`, error);
      }
    }
  }, [key, value, isLoaded]);

  return [value, setValue, isLoaded] as const;
}

// Hook spécialisé pour les données GMAO
export function useGMAOData() {
  const [equipments, setEquipments, equipmentsLoaded] = useClientStorage('gmao_equipments', []);
  const [spareParts, setSpareParts, partsLoaded] = useClientStorage('gmao_spare_parts', []);
  const [maintenanceRecords, setMaintenanceRecords, recordsLoaded] = useClientStorage('gmao_maintenance_records', []);

  const isLoaded = equipmentsLoaded && partsLoaded && recordsLoaded;

  // Ajouter une intervention
  const addIntervention = (intervention: any) => {
    console.log('Ajout intervention:', intervention);
    const newIntervention = {
      ...intervention,
      id: intervention.id || `INT-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setMaintenanceRecords((prev: any[]) => [...prev, newIntervention]);
    return newIntervention;
  };

  // Ajouter une pièce
  const addPart = (part: any) => {
    console.log('Ajout pièce:', part);
    const newPart = {
      ...part,
      id: part.id || `PART-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSpareParts((prev: any[]) => [...prev, newPart]);
    return newPart;
  };

  // Mettre à jour une intervention
  const updateIntervention = (intervention: any) => {
    console.log('Mise à jour intervention:', intervention);
    const updatedIntervention = {
      ...intervention,
      updatedAt: new Date().toISOString()
    };
    setMaintenanceRecords((prev: any[]) => 
      prev.map(record => record.id === intervention.id ? updatedIntervention : record)
    );
    return updatedIntervention;
  };

  // Mettre à jour une pièce
  const updatePart = (part: any) => {
    console.log('Mise à jour pièce:', part);
    const updatedPart = {
      ...part,
      updatedAt: new Date().toISOString()
    };
    setSpareParts((prev: any[]) => 
      prev.map(p => p.id === part.id ? updatedPart : p)
    );
    return updatedPart;
  };

  return {
    // Données
    equipments,
    spareParts,
    maintenanceRecords,
    isLoaded,
    
    // Actions
    addIntervention,
    updateIntervention,
    addPart,
    updatePart,
    
    // Setters directs si besoin
    setEquipments,
    setSpareParts,
    setMaintenanceRecords
  };
}
