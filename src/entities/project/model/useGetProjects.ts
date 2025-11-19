import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../api/getProjects';

export const useGetProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects,
  });
};
