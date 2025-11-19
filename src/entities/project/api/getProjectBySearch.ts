import { instance } from '@/shared/lib/instance';
import { ProjectType } from '../model/project';

export interface GetSearchProjectParams {
  title?: string;
  page?: number;
  size?: number;
}

export const getProjectBySearch = async (
  params: GetSearchProjectParams,
): Promise<ProjectType[]> => {
  const response = await instance.get(`/projects/search`, { params });
  return response.data.data.projects;
};
