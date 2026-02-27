import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import type { ProfileDetails } from './profileTypes';
import { getEmptyProfileDetails } from './profileTypes';
import { loadLocalProfile, saveLocalProfile } from './profileLocalStore';
import { loadSession } from '../auth/session';
import { backendToFrontend, frontendToBackend } from './profileBackendMapper';

const PROFILE_QUERY_KEY = 'userProfile';

/**
 * Hook that provides current profile details and save mutation.
 * Handles both Internet Identity (backend) and local sessions (localStorage).
 */
export function useProfileDetails() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();

  // Determine if we're using Internet Identity or local session
  const isInternetIdentity = !isInitializing && identity && !identity.getPrincipal().isAnonymous();
  const localSession = loadSession();
  const hasLocalSession = !!localSession;

  // Query for profile details
  const query = useQuery<ProfileDetails | null>({
    queryKey: [PROFILE_QUERY_KEY, identity?.getPrincipal().toString(), localSession?.type, localSession?.phone],
    queryFn: async () => {
      // Internet Identity: fetch from backend
      if (isInternetIdentity && actor) {
        try {
          const backendProfile = await actor.getCallerUserProfile();
          if (backendProfile) {
            return backendToFrontend(backendProfile);
          }
          return null;
        } catch (error) {
          console.error('Failed to fetch backend profile:', error);
          return null;
        }
      }

      // Local session: fetch from localStorage
      if (hasLocalSession) {
        return loadLocalProfile();
      }

      return null;
    },
    enabled: (isInternetIdentity && !!actor && !actorFetching) || hasLocalSession,
    retry: false,
  });

  // Mutation for saving profile
  const saveMutation = useMutation({
    mutationFn: async (profile: ProfileDetails) => {
      // Internet Identity: save to backend
      if (isInternetIdentity && actor) {
        const backendProfile = frontendToBackend(profile);
        await actor.saveCallerUserProfile(backendProfile);
        return;
      }

      // Local session: save to localStorage
      if (hasLocalSession) {
        saveLocalProfile(profile);
        return;
      }

      throw new Error('No active session');
    },
    onSuccess: (_, profile) => {
      // Update cache immediately
      queryClient.setQueryData(
        [PROFILE_QUERY_KEY, identity?.getPrincipal().toString(), localSession?.type, localSession?.phone],
        profile
      );
      // Invalidate to refetch
      queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] });
    },
  });

  return {
    profile: query.data || null,
    isLoading: actorFetching || isInitializing || query.isLoading,
    isFetched: query.isFetched,
    saveProfile: saveMutation.mutateAsync,
    isSaving: saveMutation.isPending,
  };
}
