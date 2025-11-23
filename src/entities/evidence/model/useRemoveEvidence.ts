import { useMutation } from '@tanstack/react-query';

import { removeEvidence } from '../api/removeEvidence';

export const useRemoveEvidence = () => {
  return useMutation({
    mutationKey: ['evidence'],
    mutationFn: removeEvidence,
  });
};
