import { useSuspenseQuery } from '@tanstack/react-query';

import { studentQueries } from '../api/queries';

export const useGetCurrentStudent = () => {
  return useSuspenseQuery({
    ...studentQueries.me(),
    staleTime: 60 * 60 * 1000,
  });
};
