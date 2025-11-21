import { useQuery } from '@tanstack/react-query';

import { getCurrentStudent } from '../api/getCurrentStudent';

export const useGetCurrentStudent = () => {
  return useQuery({
    queryKey: ['student', 'current'],
    queryFn: () => getCurrentStudent(),
  });
};
