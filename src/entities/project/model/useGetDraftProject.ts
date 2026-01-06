import { useSuspenseQuery } from '@tanstack/react-query';

import { getDraftProject } from '../api/getDraftProject';

export const useGetDraftProject = () => {
  return useSuspenseQuery({
    queryKey: ['project', 'draft'],
    queryFn: () => getDraftProject(),
    retry: false,
  });
};
