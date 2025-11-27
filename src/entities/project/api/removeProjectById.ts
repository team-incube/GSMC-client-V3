import { instance } from '@/shared/lib/instance';

export interface removeProjectByIdRequest {
  projectId: number;
}

export const removeProjectById = async ({ projectId }: removeProjectByIdRequest) => {
  const response = await instance.delete(`/projects/${projectId}`);
  return response.data.data;
};
