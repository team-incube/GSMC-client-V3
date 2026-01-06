import { queryOptions } from '@tanstack/react-query';

import { getCurrentStudent } from './getCurrentStudent';

export const studentQueries = {
  all: () => ['student'] as const,
  me: () =>
    queryOptions({
      queryKey: [...studentQueries.all(), 'me'],
      queryFn: getCurrentStudent,
    }),
};
