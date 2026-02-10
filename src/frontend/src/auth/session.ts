/**
 * Local session utility for managing non-Internet-Identity authentication states
 * (demo phone+OTP flow, password-based sign-in, and "Continue as Guest").
 */

const SESSION_KEY = 'healthcare_local_session';

// Session expires after 30 days
const SESSION_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000;

export type SessionType = 'otp' | 'password' | 'guest' | null;

export interface LocalSession {
  type: SessionType;
  phone?: string;
  fullName?: string;
  timestamp: number;
}

/**
 * Save a local session to localStorage
 */
export function saveSession(type: SessionType, phone?: string, fullName?: string): void {
  if (!type) {
    clearSession();
    return;
  }

  const session: LocalSession = {
    type,
    phone,
    fullName,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Failed to save session:', error);
  }
}

/**
 * Load the current local session from localStorage
 */
export function loadSession(): LocalSession | null {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    const session: LocalSession = JSON.parse(stored);
    return session;
  } catch (error) {
    console.error('Failed to load session:', error);
    return null;
  }
}

/**
 * Clear the local session from localStorage
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
}

/**
 * Validate a session object for shape and expiration
 */
function validateSession(session: LocalSession | null): boolean {
  if (!session) return false;

  // Check type is valid
  if (!session.type || !['otp', 'password', 'guest'].includes(session.type)) {
    return false;
  }

  // Check timestamp exists and is a number
  if (typeof session.timestamp !== 'number' || isNaN(session.timestamp)) {
    return false;
  }

  // Check expiration
  const now = Date.now();
  const age = now - session.timestamp;
  if (age > SESSION_EXPIRY_MS || age < 0) {
    return false;
  }

  // Type-specific validation
  if (session.type === 'otp' || session.type === 'password') {
    // OTP and password sessions must have a phone number
    if (!session.phone || typeof session.phone !== 'string') {
      return false;
    }
  }

  if (session.type === 'password') {
    // Password sessions should have a full name
    if (!session.fullName || typeof session.fullName !== 'string') {
      return false;
    }
  }

  return true;
}

/**
 * Check if a valid local session exists
 */
export function hasValidSession(): boolean {
  const session = loadSession();
  const isValid = validateSession(session);
  
  // Clear invalid or expired sessions
  if (!isValid && session) {
    clearSession();
  }
  
  return isValid;
}
