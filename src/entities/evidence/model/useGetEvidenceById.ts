import { useQuery } from '@tanstack/react-query';

import { getEvidenceById, getEvidenceByIdRequest } from '../api/getEvidenceById';

/**
 * @unused
 */
export const useGetEvidenceById = ({ evidenceId }: getEvidenceByIdRequest) => {
  return useQuery({
    queryKey: ['evidence', evidenceId],
    queryFn: () => getEvidenceById({ evidenceId }),
    enabled: !!evidenceId,
  });
};
