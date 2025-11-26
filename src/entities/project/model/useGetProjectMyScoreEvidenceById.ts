import { useQuery } from '@tanstack/react-query';

import {
  getProjectMyScoreEvidenceById,
  getProjectMyScoreEvidenceByIdRequest,
} from '../api/getProjectMyScoreEvidenceById';

export const useGetProjectMyScoreEvidenceById = ({
  projectId,
}: getProjectMyScoreEvidenceByIdRequest) => {
  return useQuery({
    queryKey: ['project', 'score', 'evidence', projectId],
    queryFn: () => getProjectMyScoreEvidenceById({ projectId }),
    enabled: !!projectId,
  });
};
