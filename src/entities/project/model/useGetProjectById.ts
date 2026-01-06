import { useSuspenseQuery } from '@tanstack/react-query';

import { getProjectById, GetProjectByIdRequest } from '../api/getProjectById';

export const useGetProjectById = ({ projectId }: GetProjectByIdRequest) => {
  return useSuspenseQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById({ projectId }),
  });
};
