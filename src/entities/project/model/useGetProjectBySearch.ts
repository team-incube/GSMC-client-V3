import { useQuery } from '@tanstack/react-query';

import { getProjectBySearch, GetProjectBySearchRequest } from '../api/getProjectBySearch';

export const useGetProjectBySearch = (params: GetProjectBySearchRequest) => {
  return useQuery({
    queryKey: ['project', 'list', 'search', params.title],
    queryFn: () => getProjectBySearch(params),
    enabled: !!params.title?.trim(),
    staleTime: 1 * 60 * 1000,
  });
};
