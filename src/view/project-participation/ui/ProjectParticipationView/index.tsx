'use client';

import { useSearchParams } from 'next/navigation';

import { useGetDraftEvidence } from '@/entities/evidence/model/useGetDraftEvidence';
import { useGetProjectMyScoreById } from '@/entities/project/model/useGetProjectMyScoreById';
import EvidenceForm from '@/feature/evidence/ui';

export default function ProjectParticipationView() {
  const projectId = Number(useSearchParams().get('projectId'));
  const { data: projectScoreEvidence } = useGetProjectMyScoreById({ projectId });
  const { data: draftEvidence } = useGetDraftEvidence();

  const initialData = draftEvidence ? {
    projectId,
    title: draftEvidence.title,
    content: draftEvidence.content,
    fileIds: draftEvidence.fileIds,
  } : projectScoreEvidence?.evidence ? {
    projectId,
    evidenceId: projectScoreEvidence.evidence.evidenceId,
    scoreId: projectScoreEvidence.score.scoreId,
    title: projectScoreEvidence.evidence.title,
    content: projectScoreEvidence.evidence.content,
    files: projectScoreEvidence.evidence?.files,
  } : { projectId };

  const mode = initialData.evidenceId ? 'edit' : 'create';
  const showDelete = !!initialData.evidenceId;

  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col items-start">
        <h1 className="text-main-700 text-titleMedium mb-9">프로젝트 참여</h1>
        <EvidenceForm mode={mode} initialData={initialData} actions={{ showDraft: true, showDelete }} />
      </div>
    </div>
  );
}
