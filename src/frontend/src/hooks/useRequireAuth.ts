import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from './useInternetIdentity';
import { useAuthSession } from './useAuthSession';

/**
 * Route guard hook that redirects to /signin when user is not authenticated
 * Checks both Internet Identity and local session state (OTP, password, guest)
 */
export function useRequireAuth() {
  const navigate = useNavigate();
  const { identity, isInitializing } = useInternetIdentity();
  const { hasSession } = useAuthSession();

  useEffect(() => {
    // Wait for Internet Identity to finish initializing
    if (isInitializing) {
      return;
    }

    // Check if user has either Internet Identity or local session
    const hasInternetIdentity = !!identity;
    const hasLocalSession = hasSession();

    if (!hasInternetIdentity && !hasLocalSession) {
      // User is not authenticated, redirect to sign in
      navigate({ to: '/signin', replace: true });
    }
  }, [identity, isInitializing, hasSession, navigate]);
}
