import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

// Example query hook structure for future backend integration
export function useExampleQuery() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      if (!actor) return null;
      // Call backend methods here when available
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}

/**
 * Hook to fetch the current user's profile from the backend.
 * Used for Internet Identity authentication.
 */
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  // Return custom state that properly reflects actor dependency
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}
