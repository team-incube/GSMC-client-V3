import { useQuery } from '@tanstack/react-query';

import { getProjectById, getProjectByIdRequest } from '../api/getProjectById';

export const useGetProjectById = ({ projectId }: getProjectByIdRequest) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById({ projectId }),
    enabled: !!projectId,
  });
};
