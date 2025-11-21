import { useQuery } from '@tanstack/react-query';

import { getEvidence } from '../api/getEvidence';

export const useGetEvidence = (evidenceId: string) => {
  return useQuery({
    queryKey: ['evidence', evidenceId],
    queryFn: () => getEvidence(evidenceId),
    enabled: !!evidenceId,
  });
};
