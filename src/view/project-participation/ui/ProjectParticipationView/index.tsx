'use client';

import { useParams } from 'next/navigation';

import { useGetDraftEvidence } from '@/entities/evidence/model/useGetDraftEvidence';
import { useGetProjectMyScoreById } from '@/entities/project/model/useGetProjectMyScoreById';
import ProjectParticipationForm from '@/feature/project-participation/ui';

export default function ProjectParticipationView() {
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const projectId = Number(rawId);

  const { data: projectScoreEvidence } = useGetProjectMyScoreById({ projectId });
  const { data: draftEvidence } = useGetDraftEvidence();

  const initialValues = draftEvidence
    ? {
      title: draftEvidence.title,
      content: draftEvidence.content,
      fileIds: draftEvidence.fileIds,
    }
    : projectScoreEvidence?.score.evidence
      ? {
        title: projectScoreEvidence.score.evidence.title,
        content: projectScoreEvidence.score.evidence.content,
        evidenceId: projectScoreEvidence.score.evidence.evidenceId,
        files: projectScoreEvidence.score.evidence.files ?? undefined,
      }
      : undefined;

  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col items-start">
        <ProjectParticipationForm initialValues={initialValues} />
      </div>
    </div>
  );
}
