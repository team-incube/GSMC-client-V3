import { useSuspenseQuery } from '@tanstack/react-query';

import { GetProjectMyScoreByIdRequest } from '../api/getProjectMyScoreById';
import { projectQueries } from '../api/queries';

export const useGetProjectMyScoreById = ({ projectId }: GetProjectMyScoreByIdRequest) => {
  return useSuspenseQuery(projectQueries.myScore({ projectId }));
};