import { instance } from '@/shared/lib/instance';

export interface removeDraftProjectRequest {
  projectId: number;
}

export const removeDraftProject = async ({ projectId }: removeDraftProjectRequest) => {
  const response = await instance.delete(`/projects/draft/${projectId}`);
  return response.data;
};
