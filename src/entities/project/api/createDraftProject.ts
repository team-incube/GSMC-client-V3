import { instance } from '@/shared/lib/instance';

export interface CreateDraftProjectRequest {
  title: string;
  description: string;
  fileIds?: number[] | null;
  participantIds: number[];
}

export const createDraftProject = async ({
  title,
  description,
  fileIds,
  participantIds,
}: CreateDraftProjectRequest) => {
  const response = await instance.post('/projects/draft', {
    title,
    description,
    fileIds,
    participantIds,
  });
  return response.data;
};
