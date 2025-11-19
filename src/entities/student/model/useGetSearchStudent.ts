import { useQuery } from '@tanstack/react-query';
import { getSearchStudent, GetSearchStudentRequest } from '../api/getSearchStudent';
import { StudentType } from '../model/StudentSchema';
import { useDebouncedValue } from '@/shared/model/useDebouncedValue';

export const useGetSearchStudent = (params: GetSearchStudentRequest) => {
  const debouncedParams = useDebouncedValue(params, 500);

  return useQuery<StudentType[]>({
    queryKey: ['searchStudent', debouncedParams],
    queryFn: () => getSearchStudent(debouncedParams),
    enabled: !!debouncedParams.name?.trim(),
    staleTime: 1000 * 60,
  });
};
