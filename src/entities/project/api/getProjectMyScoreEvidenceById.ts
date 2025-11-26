import { instance } from '@/shared/lib/instance';

import { ProjectScoreEvidenceType } from '../model/project';

export interface getProjectMyScoreEvidenceByIdRequest {
  projectId: number;
}

export const getProjectMyScoreEvidenceById = async ({
  projectId,
}: getProjectMyScoreEvidenceByIdRequest): Promise<ProjectScoreEvidenceType> => {
  const response = await instance.get(`/projects/${projectId}/my-score-and-evidence`);
  return response.data.data;
};
