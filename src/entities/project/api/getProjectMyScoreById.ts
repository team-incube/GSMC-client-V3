import { instance } from '@/shared/lib/instance';

import { ProjectScoreEvidenceGroupType } from '../model/project';

export interface GetProjectMyScoreByIdRequest {
  projectId: number;
}

export const getProjectMyScoreById = async ({
  projectId,
}: GetProjectMyScoreByIdRequest): Promise<ProjectScoreEvidenceGroupType> => {
  const response = await instance.get(`/projects/${projectId}/my-score-and-evidence`);
  return response.data.data;
};
