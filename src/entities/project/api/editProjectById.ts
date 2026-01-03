import { instance } from '@/shared/lib/instance';

export interface EditProjectByIdRequest {
  projectId: number;
  title: string;
  description: string;
  fileIds?: number[] | null;
  participantIds: number[];
}

export const editProjectById = async ({
  projectId,
  title,
  description,
  fileIds,
  participantIds,
}: EditProjectByIdRequest) => {
  const response = await instance.patch(`/projects/${projectId}`, {
    title,
    description,
    fileIds,
    participantIds,
  });
  return response.data;
};
