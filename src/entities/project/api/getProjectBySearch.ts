import { instance } from '@/shared/lib/instance';

import { ProjectType } from '../model/project';

export interface GetProjectBySearchRequest {
  title?: string;
  page?: number;
  size?: number;
}

export const getProjectBySearch = async (
  params: GetProjectBySearchRequest,
): Promise<ProjectType[]> => {
  const response = await instance.get(`/projects/search`, { params });
  return response.data.data.projects;
};
