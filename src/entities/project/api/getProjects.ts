import { instance } from '@/shared/lib/instance';

import { ProjectType } from '../model/project';

export const getProjects = async (): Promise<ProjectType[]> => {
  const response = await instance.get(`/projects/my`);
  return response.data.data;
};
