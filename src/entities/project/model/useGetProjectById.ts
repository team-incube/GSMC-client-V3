import { useQuery } from '@tanstack/react-query';

import { getProjectById, GetProjectByIdRequest } from '../api/getProjectById';

export const useGetProjectById = ({ projectId }: GetProjectByIdRequest) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById({ projectId }),
    enabled: !!projectId,
  });
};
