import { generateUserProfile } from '@/lib/flaker';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  bloodType: string;
  allergies: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

// Generate demo user with fixed seed for consistency
export const MOCK_USER: UserProfile = generateUserProfile(42);
