import { instance } from '@/shared/lib/instance';

export interface createDraftProjectRequest {
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
}: createDraftProjectRequest) => {
  const response = await instance.post('/projects/draft', {
    title,
    description,
    fileIds,
    participantIds,
  });
  return response.data;
};
