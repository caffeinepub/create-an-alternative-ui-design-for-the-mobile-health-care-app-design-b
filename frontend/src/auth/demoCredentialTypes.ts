/**
 * Type definitions for demo credential store
 */

export interface DemoAccount {
  fullName: string;
  phoneNumber: string;
  passwordHash: string;
  createdAt?: number;
}

export interface VerifyCredentialsResult {
  success: boolean;
  error?: string;
  account?: DemoAccount;
  passwordHash?: string; // Added for backend sync
}

export interface CreateAccountResult {
  success: boolean;
  error?: string;
  account?: DemoAccount;
  passwordHash?: string; // Added for backend sync
}
