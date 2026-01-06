import { useSuspenseQuery } from '@tanstack/react-query';

import { GetProjectByIdRequest } from '../api/getProjectById';
import { projectQueries } from '../api/queries';

export const useGetProjectById = ({ projectId }: GetProjectByIdRequest) => {
  return useSuspenseQuery(projectQueries.detail({ projectId }));
};
