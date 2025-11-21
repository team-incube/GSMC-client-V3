import { useQuery } from '@tanstack/react-query';

import { getProjectBySearch, GetSearchProjectParams } from '../api/getProjectBySearch';

export const useGetProjectBySearch = (params: GetSearchProjectParams) => {
  return useQuery({
    queryKey: ['project', 'list', 'search', params.title],
    queryFn: () => getProjectBySearch(params),
    enabled: !!params.title?.trim(),
  });
};
