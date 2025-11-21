import { useQuery } from '@tanstack/react-query';

import { getSearchStudent, GetSearchStudentParams } from '../api/getSearchStudent';

export const useGetSearchStudent = (params: GetSearchStudentParams) => {
  return useQuery({
    queryKey: ['student', 'search', params],
    queryFn: () => getSearchStudent(params),
    enabled: !!params.name?.trim(),
    staleTime: 1000 * 60,
  });
};
