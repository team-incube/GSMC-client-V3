import { addEvidence } from '../api/addEvidence';
import { useMutation } from '@tanstack/react-query';

export const useAddEvidence = () => {
  return useMutation({
    mutationKey: ['evidence'],
    mutationFn: addEvidence,
  });
};
