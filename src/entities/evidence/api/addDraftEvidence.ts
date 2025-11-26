import { ParticipationProjectFormValueType } from '@/feature/project-participation/model/ParticipationProjectSchema';
import { instance } from '@/shared/lib/instance';

export const addDraftEvidence = async (evidenceData: ParticipationProjectFormValueType) => {
  const response = await instance.post('/evidences/draft', evidenceData);
  return response.data;
};
