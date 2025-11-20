import { useMutation } from '@tanstack/react-query';
import { editEvidence } from '../api/editEvidence';

export const useEditEvidence = (evidenceId: number) => {
  return useMutation({
    mutationKey: ['evidence'],
    mutationFn: () => editEvidence(evidenceId),
  });
};
