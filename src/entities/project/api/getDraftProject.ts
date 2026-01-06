import { instance } from '@/shared/lib/instance';

import { ProjectType } from '../model/project';

export const getDraftProject = async (): Promise<ProjectType | null> => {
  const response = await instance.get(`/projects/draft`);
  return response.data?.data ?? null;
};
