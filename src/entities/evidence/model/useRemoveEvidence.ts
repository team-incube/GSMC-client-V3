import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeEvidence } from '../api/removeEvidence';

export const useRemoveEvidence = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['evidence'],
    mutationFn: removeEvidence,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evidence'] });
    },
  });
};
