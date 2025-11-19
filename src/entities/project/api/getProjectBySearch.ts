import { instance } from '@/shared/lib/instance';

export interface GetSearchProjectRequest {
  title?: string;
  page?: number;
  size?: number;
}

export const getProjectBySearch = async (props: GetSearchProjectRequest) => {
  const response = await instance.get(`/projects/search`, { params: props });
  return response.data;
};
