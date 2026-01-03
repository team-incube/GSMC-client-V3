import { useQuery } from '@tanstack/react-query';

import { getProjectMyScoreById, GetProjectMyScoreByIdRequest } from '../api/getProjectMyScoreById';

export const useGetProjectMyScoreById = ({ projectId }: GetProjectMyScoreByIdRequest) => {
  return useQuery({
    queryKey: ['evidence', 'score', projectId],
    queryFn: () => getProjectMyScoreById({ projectId }),
    enabled: !!projectId,
  });
};
