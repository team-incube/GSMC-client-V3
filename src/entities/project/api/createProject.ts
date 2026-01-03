import { instance } from '@/shared/lib/instance';

export interface CreateProjectRequest {
  title: string;
  description: string;
  fileIds?: number[] | null;
  participantIds: number[];
}

export const createProject = async ({
  title,
  description,
  fileIds,
  participantIds,
}: CreateProjectRequest) => {
  const response = await instance.post('/projects', {
    title,
    description,
    fileIds,
    participantIds,
  });
  return response.data;
};
