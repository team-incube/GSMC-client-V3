import { useQuery } from '@tanstack/react-query';

import { getEvidenceById, GetEvidenceByIdRequest } from '../api/getEvidenceById';

/**
 * @unused
 */
export const useGetEvidenceById = ({ evidenceId }: GetEvidenceByIdRequest) => {
  return useQuery({
    queryKey: ['evidence', evidenceId],
    queryFn: () => getEvidenceById({ evidenceId }),
    enabled: !!evidenceId,
  });
};
