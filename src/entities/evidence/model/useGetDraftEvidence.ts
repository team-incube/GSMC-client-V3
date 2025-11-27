import { useQuery } from '@tanstack/react-query';

import { getDraftEvidence } from '../api/getDraftEvidence';

export const useGetDraftEvidence = () => {
  return useQuery({
    queryKey: ['evidence', 'draft'],
    queryFn: () => getDraftEvidence(),
  });
};
