import { instance } from '@/shared/lib/instance';

import { ProjectType } from '../model/project';

export interface getProjectByIdRequest {
  projectId: number;
}

export const getProjectById = async ({
  projectId,
}: getProjectByIdRequest): Promise<ProjectType> => {
  const response = await instance.get(`/projects/${projectId}`);
  return response.data.data;
};
