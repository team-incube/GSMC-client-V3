import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '../api/getProjectById';

export const useGetProjectById = (projectId: number) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });
};
