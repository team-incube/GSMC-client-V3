import { useQuery } from '@tanstack/react-query';

import { getProjectMyScoreById, getProjectMyScoreByIdRequest } from '../api/getProjectMyScoreById';

export const useGetProjectMyScoreById = ({ projectId }: getProjectMyScoreByIdRequest) => {
  return useQuery({
    queryKey: ['evidence', 'score', projectId],
    queryFn: () => getProjectMyScoreById({ projectId }),
    enabled: !!projectId,
  });
};
