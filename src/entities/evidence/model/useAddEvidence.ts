import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addEvidence } from '../api/addEvidence';

/**
 * @unused
 */
export const useAddEvidence = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['evidence'],
    mutationFn: addEvidence,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evidence'] });
    },
  });
};
