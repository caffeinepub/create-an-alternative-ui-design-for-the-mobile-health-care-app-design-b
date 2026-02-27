import type { ProfileDetails } from './profileTypes';
import { getEmptyProfileDetails } from './profileTypes';
import { loadSession } from '../auth/session';

const PROFILE_KEY_PREFIX = 'healthcare_profile_';
const GUEST_ID_KEY = 'healthcare_guest_id';

/**
 * Get a stable guest ID for the current browser
 */
function getGuestId(): string {
  let guestId = localStorage.getItem(GUEST_ID_KEY);
  if (!guestId) {
    guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }
  return guestId;
}

/**
 * Get the storage key for the current local session
 */
function getLocalSessionKey(): string | null {
  const session = loadSession();
  if (!session) return null;

  if (session.type === 'password' || session.type === 'otp') {
    // Use phone number as the key for password/OTP sessions
    return session.phone || null;
  }

  if (session.type === 'guest') {
    // Use stable guest ID for guest sessions
    return getGuestId();
  }

  return null;
}

/**
 * Load profile details from localStorage for the current local session
 */
export function loadLocalProfile(): ProfileDetails | null {
  const sessionKey = getLocalSessionKey();
  if (!sessionKey) return null;

  try {
    const storageKey = `${PROFILE_KEY_PREFIX}${sessionKey}`;
    const stored = localStorage.getItem(storageKey);
    if (!stored) return null;

    return JSON.parse(stored) as ProfileDetails;
  } catch (error) {
    console.error('Failed to load local profile:', error);
    return null;
  }
}

/**
 * Save profile details to localStorage for the current local session
 */
export function saveLocalProfile(profile: ProfileDetails): void {
  const sessionKey = getLocalSessionKey();
  if (!sessionKey) {
    console.warn('No active local session to save profile to');
    return;
  }

  try {
    const storageKey = `${PROFILE_KEY_PREFIX}${sessionKey}`;
    localStorage.setItem(storageKey, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to save local profile:', error);
  }
}

/**
 * Clear profile details from localStorage for the current local session
 */
export function clearLocalProfile(): void {
  const sessionKey = getLocalSessionKey();
  if (!sessionKey) return;

  try {
    const storageKey = `${PROFILE_KEY_PREFIX}${sessionKey}`;
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error('Failed to clear local profile:', error);
  }
}

/**
 * Initialize or update local profile with auth-captured details.
 * Only fills empty fields; never overwrites existing non-empty values.
 * 
 * @param updates - Partial profile data to merge (e.g., { fullName, phone })
 */
export function initializeLocalProfileFromAuth(updates: Partial<ProfileDetails>): void {
  const sessionKey = getLocalSessionKey();
  if (!sessionKey) {
    console.warn('No active local session to initialize profile');
    return;
  }

  try {
    // Load existing profile or start with empty
    const existing = loadLocalProfile() || getEmptyProfileDetails();

    // Merge updates, only filling empty fields
    const merged: ProfileDetails = {
      fullName: existing.fullName || updates.fullName || '',
      email: existing.email || updates.email || '',
      phone: existing.phone || updates.phone || '',
      dateOfBirth: existing.dateOfBirth || updates.dateOfBirth || '',
      bloodType: existing.bloodType || updates.bloodType || '',
      allergies: existing.allergies.length > 0 ? existing.allergies : (updates.allergies || []),
      emergencyContact: {
        name: existing.emergencyContact.name || updates.emergencyContact?.name || '',
        phone: existing.emergencyContact.phone || updates.emergencyContact?.phone || '',
        relationship: existing.emergencyContact.relationship || updates.emergencyContact?.relationship || '',
      },
    };

    // Save merged profile
    saveLocalProfile(merged);
  } catch (error) {
    console.error('Failed to initialize local profile from auth:', error);
  }
}
