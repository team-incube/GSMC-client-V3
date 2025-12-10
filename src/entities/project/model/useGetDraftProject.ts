import { useQuery } from '@tanstack/react-query';

import { getDraftProject } from '../api/getDraftProject';

export const useGetDraftProject = () => {
  return useQuery({
    queryKey: ['project', 'draft'],
    queryFn: () => getDraftProject(),
    retry: false,
  });
};
