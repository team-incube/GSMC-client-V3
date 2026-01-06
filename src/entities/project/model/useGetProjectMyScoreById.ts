import { useSuspenseQuery } from '@tanstack/react-query';

import { getProjectMyScoreById, GetProjectMyScoreByIdRequest } from '../api/getProjectMyScoreById';

export const useGetProjectMyScoreById = ({ projectId }: GetProjectMyScoreByIdRequest) => {
  return useSuspenseQuery({
    queryKey: ['evidence', 'score', projectId],
    queryFn: () => getProjectMyScoreById({ projectId }),
  });
};
