// Configuration du branding Dangote Cement Cameroon

export const dangoteBranding = {
  company: {
    name: 'Dangote Cement Cameroon',
    fullName: 'Dangote Cement Cameroon S.A.',
    group: 'Dangote Industries Limited',
    location: 'Douala, Cameroun',
    capacity: '1,5 MT/an',
    website: 'www.dangote-cement.com',
    email: 'info@dangote-cement.cm'
  },
  
  colors: {
    primary: {
      red: '#DC2626', // Rouge Dangote principal
      darkRed: '#B91C1C', // Rouge foncé
      lightRed: '#FEE2E2' // Rouge clair pour backgrounds
    },
    secondary: {
      blue: '#1E40AF', // Bleu navigation
      gray: '#6B7280', // Gris texte
      white: '#FFFFFF'
    },
    status: {
      operational: '#10B981', // Vert
      warning: '#F59E0B', // Orange
      critical: '#EF4444', // Rouge
      maintenance: '#8B5CF6' // Violet
    }
  },
  
  equipment: {
    kiln: {
      manufacturer: 'FLSmidth A/S Denmark',
      model: 'UNAX Kiln 4.2x65m',
      capacity: '5000 t/j clinker'
    },
    cementMill: {
      manufacturer: 'Gebr. Pfeiffer SE Germany',
      model: 'MVR 5600 C-4',
      capacity: '120 t/h ciment'
    }
  },
  
  targets: {
    availability: 95, // %
    dailyProduction: 5000, // tonnes/jour
    oee: 90, // %
    maintenance: {
      mtbf: 2000, // heures
      mttr: 4 // heures
    }
  },
  
  certifications: [
    'ISO 9001:2015',
    'ISO 14001:2015',
    'ISO 45001:2018',
    'NF EN 197-1 (CEM I 42.5R)',
    'NF EN 197-1 (CEM II/B-L 32.5R)'
  ]
};

export default dangoteBranding;
