import { instance } from "@/shared/lib/instance";

export interface editProjectByIdRequest {
  projectId: number;
  title: string;
  description: string;
  fileIds?: number[] | null;
  participantIds: number[];
}

export const editProjectById = async ({projectId, title, description, fileIds, participantIds}:editProjectByIdRequest) => {
  const response = await instance.patch(`/projects/${projectId}`, {
    title,
    description,
    fileIds,
    participantIds
  });
  return response.data;
};