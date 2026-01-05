import { useSuspenseQuery } from '@tanstack/react-query';

import { projectQueries } from '../api/queries';

export const useGetProjects = () => {
  return useSuspenseQuery(projectQueries.list());
};
