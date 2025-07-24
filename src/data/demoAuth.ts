import { User } from '../components/auth/AuthContext';

// Utilisateurs de démonstration avec mots de passe - Dangote Cement Cameroon
export const demoUsers: Array<User & { password: string }> = [
  {
    id: 'USER-ADMIN-001',
    email: 'admin@dangote-cement.cm',
    password: 'admin123',
    name: 'Marie-Claire Ondoa',
    role: 'admin',
    company: 'Dangote Cement Cameroon',
    location: 'Douala',
    createdAt: '2024-01-15T08:00:00.000Z',
    lastLogin: '2025-07-24T14:30:00.000Z'
  },
  {
    id: 'USER-TECH-001',
    email: 'maintenance@dangote-cement.cm',
    password: 'maint123',
    name: 'Paul Mbarga',
    role: 'technician',
    company: 'Dangote Cement Cameroon',
    location: 'Douala',
    createdAt: '2024-02-01T09:15:00.000Z',
    lastLogin: '2025-07-24T08:45:00.000Z'
  },
  {
    id: 'USER-MANAGER-001',
    email: 'production@dangote-cement.cm',
    password: 'prod123',
    name: 'Emmanuel Biya',
    role: 'manager',
    company: 'Dangote Cement Cameroon',
    location: 'Douala',
    createdAt: '2024-01-20T10:30:00.000Z',
    lastLogin: '2025-07-24T12:20:00.000Z'
  },
  {
    id: 'USER-OP-001',
    email: 'operateur@dangote-cement.cm',
    password: 'oper123',
    name: 'Célestine Ngouma',
    role: 'operator',
    company: 'Dangote Cement Cameroon',
    location: 'Douala',
    createdAt: '2024-03-10T14:00:00.000Z',
    lastLogin: '2025-07-23T16:45:00.000Z'
  },
  {
    id: 'USER-TECH-002',
    email: 'kiln-tech@dangote-cement.cm',
    password: 'kiln123',
    name: 'Jean-Baptiste Fouda',
    role: 'technician',
    company: 'Dangote Cement Cameroon',
    location: 'Douala',
    createdAt: '2024-04-05T11:20:00.000Z',
    lastLogin: '2025-07-24T09:15:00.000Z'
  }
];

// Fonction pour initialiser les données de démonstration
export function initializeDemoData() {
  // Vérifier si les données existent déjà
  const existingUsers = localStorage.getItem('gmao_users');
  if (existingUsers) {
    console.log('Données utilisateurs déjà présentes');
    return;
  }

  // Créer les utilisateurs (sans les mots de passe)
  const users = demoUsers.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    company: user.company,
    location: user.location,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin
  }));
  localStorage.setItem('gmao_users', JSON.stringify(users));

  // Créer les mots de passe
  const passwords = demoUsers.reduce((acc, user) => {
    acc[user.id] = user.password;
    return acc;
  }, {} as Record<string, string>);
  localStorage.setItem('gmao_passwords', JSON.stringify(passwords));

  console.log('Données de démonstration initialisées:', {
    users: users.length,
    accounts: demoUsers.map(u => ({ email: u.email, password: u.password, role: u.role }))
  });
}
