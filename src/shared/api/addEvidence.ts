import { ParticipationProjectFormValueType } from '@/feature/project-participation/model/ParticipationProjectSchema';

import { instance } from '../lib/instance';

export const addEvidence = async (evidenceData: ParticipationProjectFormValueType) => {
  const response = await instance.post('/evidences', evidenceData);
  return response.data;
};
