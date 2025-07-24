'use client';

// Système de persistance simplifié pour GMAO
export const GMAOStorage = {
  // Clés de stockage
  KEYS: {
    INTERVENTIONS: 'gmao_interventions',
    PARTS: 'gmao_parts',
    MAINTENANCE: 'gmao_maintenance'
  },

  // Vérifier si localStorage est disponible
  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  // Sauvegarder des données
  save(key: string, data: any): boolean {
    if (!this.isAvailable()) {
      console.warn('localStorage non disponible');
      return false;
    }
    
    try {
      const timestamp = new Date().toISOString();
      const dataWithMeta = {
        data,
        savedAt: timestamp,
        version: '1.0'
      };
      
      localStorage.setItem(key, JSON.stringify(dataWithMeta));
      console.log(`✅ Données sauvegardées [${key}]:`, data);
      return true;
    } catch (error) {
      console.error(`❌ Erreur sauvegarde [${key}]:`, error);
      return false;
    }
  },

  // Charger des données
  load(key: string, defaultValue: any = null): any {
    if (!this.isAvailable()) {
      console.warn('localStorage non disponible, retour valeur par défaut');
      return defaultValue;
    }

    try {
      const stored = localStorage.getItem(key);
      if (!stored) {
        console.log(`📭 Aucune donnée trouvée [${key}], valeur par défaut`);
        return defaultValue;
      }

      const parsed = JSON.parse(stored);
      const data = parsed.data || parsed; // Support ancien format
      console.log(`📁 Données chargées [${key}]:`, data);
      return data;
    } catch (error) {
      console.error(`❌ Erreur chargement [${key}]:`, error);
      return defaultValue;
    }
  },

  // Ajouter une intervention
  addIntervention(intervention: any): boolean {
    const interventions = this.load(this.KEYS.INTERVENTIONS, []);
    const newIntervention = {
      ...intervention,
      id: intervention.id || `INT-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    interventions.push(newIntervention);
    const success = this.save(this.KEYS.INTERVENTIONS, interventions);
    
    if (success) {
      console.log('🆕 Nouvelle intervention ajoutée:', newIntervention);
      // Déclencher un événement personnalisé pour notifier l'UI
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('gmao-data-changed', {
          detail: { type: 'intervention-added', data: newIntervention }
        }));
      }
    }
    
    return success;
  },

  // Récupérer toutes les interventions
  getInterventions(): any[] {
    return this.load(this.KEYS.INTERVENTIONS, []);
  },

  // Ajouter une pièce
  addPart(part: any): boolean {
    const parts = this.load(this.KEYS.PARTS, []);
    const newPart = {
      ...part,
      id: part.id || `PART-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    parts.push(newPart);
    const success = this.save(this.KEYS.PARTS, parts);
    
    if (success) {
      console.log('🔧 Nouvelle pièce ajoutée:', newPart);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('gmao-data-changed', {
          detail: { type: 'part-added', data: newPart }
        }));
      }
    }
    
    return success;
  },

  // Récupérer toutes les pièces
  getParts(): any[] {
    return this.load(this.KEYS.PARTS, []);
  },

  // Vider toutes les données
  clearAll(): boolean {
    if (!this.isAvailable()) return false;
    
    try {
      Object.values(this.KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      console.log('🗑️ Toutes les données GMAO supprimées');
      
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('gmao-data-changed', {
          detail: { type: 'all-cleared' }
        }));
      }
      
      return true;
    } catch (error) {
      console.error('❌ Erreur lors de la suppression:', error);
      return false;
    }
  },

  // Obtenir des statistiques
  getStats() {
    const interventions = this.getInterventions();
    const parts = this.getParts();
    
    return {
      interventions: {
        total: interventions.length,
        recent: interventions.filter(i => {
          const created = new Date(i.createdAt);
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return created > weekAgo;
        }).length
      },
      parts: {
        total: parts.length,
        recent: parts.filter(p => {
          const created = new Date(p.createdAt);
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return created > weekAgo;
        }).length
      },
      storage: {
        available: this.isAvailable(),
        usage: this.isAvailable() ? this._getStorageUsage() : 0
      }
    };
  },

  // Usage du stockage (en Ko approximatif)
  _getStorageUsage(): number {
    if (!this.isAvailable()) return 0;
    
    let total = 0;
    Object.values(this.KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        total += item.length;
      }
    });
    
    return Math.round(total / 1024 * 100) / 100; // Ko avec 2 décimales
  }
};

// Hook React pour utiliser le système de persistance
export function useGMAOPersistence() {
  const [stats, setStats] = React.useState(GMAOStorage.getStats());

  React.useEffect(() => {
    const updateStats = () => {
      setStats(GMAOStorage.getStats());
    };

    // Écouter les changements de données
    if (typeof window !== 'undefined') {
      window.addEventListener('gmao-data-changed', updateStats);
      return () => window.removeEventListener('gmao-data-changed', updateStats);
    }
  }, []);

  return {
    // Actions
    addIntervention: GMAOStorage.addIntervention.bind(GMAOStorage),
    addPart: GMAOStorage.addPart.bind(GMAOStorage),
    getInterventions: GMAOStorage.getInterventions.bind(GMAOStorage),
    getParts: GMAOStorage.getParts.bind(GMAOStorage),
    clearAll: GMAOStorage.clearAll.bind(GMAOStorage),
    
    // Statistiques réactives
    stats,
    
    // État
    isAvailable: GMAOStorage.isAvailable()
  };
}

// Exporter une référence React pour éviter les erreurs d'import
import React from 'react';
