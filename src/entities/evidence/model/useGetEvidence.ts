import { useQuery } from '@tanstack/react-query';
import { getEvidence } from '../api/getEvidence';

export const useGetEvidence = (evidenceId: string) => {
  return useQuery({
    queryKey: [evidenceId, 'evidence'],
    queryFn: () => getEvidence(evidenceId),
    enabled: !!evidenceId,
  });
};
