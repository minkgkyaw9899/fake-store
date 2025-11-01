import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  RefetchOptions,
  RefetchQueryFilters,
  useQueryClient,
} from '@tanstack/react-query';

export const useRefreshOnFocus = (
  filters?: RefetchQueryFilters<string[]> | undefined,
  options?: RefetchOptions,
) => {
  const queryClient = useQueryClient();
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      // refetch all stale active queries
      queryClient.refetchQueries(filters, options);
    }, [filters, options, queryClient]),
  );
};
