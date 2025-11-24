import { instance } from '@/shared/lib/instance';

import { ProjectType } from '../model/project';

export interface getProjectBySearchRequest {
  title?: string;
  page?: number;
  size?: number;
}

export const getProjectBySearch = async (
  params: getProjectBySearchRequest,
): Promise<ProjectType[]> => {
  const response = await instance.get(`/projects/search`, { params });
  return response.data.data.projects;
};
