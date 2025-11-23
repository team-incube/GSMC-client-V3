import { useQuery } from '@tanstack/react-query';

import { getSearchStudent, getSearchStudentRequest } from '../api/getSearchStudent';

export const useGetSearchStudent = (params: getSearchStudentRequest) => {
  return useQuery({
    queryKey: ['student', 'search', params],
    queryFn: () => getSearchStudent(params),
    enabled: !!params.name?.trim(),
    staleTime: 1 * 60 * 1000,
  });
};
