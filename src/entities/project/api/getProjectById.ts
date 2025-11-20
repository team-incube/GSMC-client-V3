import { instance } from '@/shared/lib/instance';
import { ProjectType } from '../model/project';

export const getProjectById = async (projectId: number): Promise<ProjectType> => {
  const response = await instance.get(`/projects/${projectId}`);
  return response.data.data;
};
