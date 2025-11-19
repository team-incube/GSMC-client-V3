import { useQuery } from '@tanstack/react-query';
import { getSearchStudent, GetSearchStudentParams } from '../api/getSearchStudent';
import { useDebouncedValue } from '@/shared/model/useDebouncedValue';

export const useGetSearchStudent = (params: GetSearchStudentParams) => {
  const debouncedParams = useDebouncedValue(params, 500);

  return useQuery({
    queryKey: ['searchStudent', debouncedParams],
    queryFn: () => getSearchStudent(debouncedParams),
    enabled: !!debouncedParams.name?.trim(),
    staleTime: 1000 * 60,
  });
};
