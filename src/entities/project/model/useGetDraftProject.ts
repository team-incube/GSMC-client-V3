import { useSuspenseQuery } from '@tanstack/react-query';

import { getDraftProject } from '../api/getDraftProject';
import { ProjectType } from '../model/project';

export const useGetDraftProject = () => {
  return useSuspenseQuery<ProjectType | null>({
    queryKey: ['project', 'draft'],
    queryFn: () => getDraftProject(),
    retry: false,
  });
};
