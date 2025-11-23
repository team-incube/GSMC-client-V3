import { useMutation } from '@tanstack/react-query';

import { addEvidence } from '../api/addEvidence';

export const useAddEvidence = () => {
  return useMutation({
    mutationKey: ['evidence'],
    mutationFn: addEvidence,
  });
};
