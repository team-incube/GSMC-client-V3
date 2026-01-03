import { useQuery } from '@tanstack/react-query';

import { getSearchStudent, GetSearchStudentRequest } from '../api/getSearchStudent';

export const useGetSearchStudent = (params: GetSearchStudentRequest) => {
  return useQuery({
    queryKey: ['student', 'search', params],
    queryFn: () => getSearchStudent(params),
    enabled: !!params.name?.trim(),
    staleTime: 1 * 60 * 1000,
  });
};
