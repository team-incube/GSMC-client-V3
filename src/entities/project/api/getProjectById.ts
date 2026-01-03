import { instance } from '@/shared/lib/instance';

import { ProjectType } from '../model/project';

export interface GetProjectByIdRequest {
  projectId: number;
}

export const getProjectById = async ({
  projectId,
}: GetProjectByIdRequest): Promise<ProjectType> => {
  const response = await instance.get(`/projects/${projectId}`);
  return response.data.data;
};
