import { instance } from '@/shared/lib/instance';

import { ProjectType } from '../model/project';

export interface removeProjectByIdRequest {
  projectId: number;
}

export const removeProjectById = async ({
  projectId,
}: removeProjectByIdRequest): Promise<ProjectType> => {
  const response = await instance.delete(`/projects/${projectId}`);
  return response.data.data;
};
