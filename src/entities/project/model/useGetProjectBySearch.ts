import { useQuery } from '@tanstack/react-query';

import { getProjectBySearch, getProjectBySearchRequest } from '../api/getProjectBySearch';

export const useGetProjectBySearch = (params: getProjectBySearchRequest) => {
  return useQuery({
    queryKey: ['project', 'list', 'search', params.title],
    queryFn: () => getProjectBySearch(params),
    enabled: !!params.title?.trim(),
    staleTime: 1 * 60 * 1000,
  });
};
