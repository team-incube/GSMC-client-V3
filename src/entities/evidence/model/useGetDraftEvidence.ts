import { useSuspenseQuery } from '@tanstack/react-query';

import { getDraftEvidence } from '../api/getDraftEvidence';

export const useGetDraftEvidence = () => {
  return useSuspenseQuery({
    queryKey: ['evidence', 'draft'],
    queryFn: () => getDraftEvidence(),
    retry: false,
  });
};
