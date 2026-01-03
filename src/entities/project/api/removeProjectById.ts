import { instance } from '@/shared/lib/instance';

export interface RemoveProjectByIdRequest {
  projectId: number;
}

export const removeProjectById = async ({ projectId }: RemoveProjectByIdRequest) => {
  const response = await instance.delete(`/projects/${projectId}`);
  return response.data.data;
};
