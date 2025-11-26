import { instance } from '@/shared/lib/instance';

import { ProjectScoreType } from '../model/project';

export interface getProjectMyScoreByIdRequest {
  projectId: number;
}

export const getProjectMyScoreById = async ({
  projectId,
}: getProjectMyScoreByIdRequest): Promise<ProjectScoreType> => {
  const response = await instance.get(`/projects/${projectId}/my-score-and-evidence`);
  return response.data.data;
};
