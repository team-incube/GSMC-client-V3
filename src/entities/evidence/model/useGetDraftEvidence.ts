import { useQuery } from '@tanstack/react-query';

import { ProjectScoreEvidenceGroupType } from '@/entities/project/model/project';

import { getDraftEvidence } from '../api/getDraftEvidence';

export const useGetDraftEvidence = ({ projectScoreEvidence }: { projectScoreEvidence?: ProjectScoreEvidenceGroupType }) => {
  return useQuery({
    queryKey: ['evidence', 'draft'],
    queryFn: () => getDraftEvidence(),
    enabled: !projectScoreEvidence,
  });
};
