import { User, AuthUser } from '@/types';

/**
 * Transforms an API authenticated user session into the client domain User model
 */
export const mapAuthUserToClientUser = (loggedUser: AuthUser): User => {
  const initials = loggedUser.name
    ? loggedUser.name
        .split(' ')
        .map((p) => p[0])
        .filter(Boolean)
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  return {
    id: loggedUser.id,
    name: loggedUser.name,
    email: loggedUser.email,
    phone: loggedUser.phone || '',
    avatar: initials,
    dob: '1995-01-01',
    memberSince: new Date(loggedUser.createdAt).getFullYear().toString(),
    insuranceProvider: 'Standard Dental Cover',
    policyNumber: `POL-${loggedUser.id.slice(-6).toUpperCase()}`,
    role: loggedUser.role === 'ADMIN' ? 'admin' : 'patient',
  };
};
