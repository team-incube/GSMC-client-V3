import { useQuery } from '@tanstack/react-query';

import { getEvidenceById, getScoreByIdRequest } from '../api/getEvidenceById';

export const useGetEvidence = ({ evidenceId }: getScoreByIdRequest) => {
  return useQuery({
    queryKey: ['evidence', evidenceId],
    queryFn: () => getEvidenceById({ evidenceId }),
    enabled: !!evidenceId,
  });
};
