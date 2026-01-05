'use client';

import { useSearchParams } from 'next/navigation';

import { useGetDraftEvidence } from '@/entities/evidence/model/useGetDraftEvidence';
import { useGetProjectById } from '@/entities/project/model/useGetProjectById';
import { useGetProjectMyScoreById } from '@/entities/project/model/useGetProjectMyScoreById';
import { useGetCurrentStudent } from '@/entities/student/model/useGetCurrentStudent';
import EvidenceForm from '@/feature/evidence/ui';

export default function ProjectParticipationView() {
  const projectId = Number(useSearchParams().get('projectId'));
  const { data: projectScoreEvidence, isLoading: isScoreLoading } = useGetProjectMyScoreById({ projectId });
  const { data: draftEvidence, isLoading: isDraftLoading } = useGetDraftEvidence({ projectScoreEvidence });
  const { data: project, isLoading: isProjectLoading } = useGetProjectById({ projectId });
  const { data: student, isLoading: isStudentLoading } = useGetCurrentStudent();

  if (isScoreLoading || isDraftLoading || isProjectLoading || isStudentLoading) {
    return (
      <div className="flex w-full justify-center px-4 py-15.5">
        <div className="flex w-full max-w-[600px] flex-col items-center justify-center h-[400px]">
          <p className="text-gray-500">데이터를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  const isParticipant = project?.participants.some((p) => p.id === student?.id);

  if (!isParticipant) {
    return (
      <div className="flex w-full justify-center px-4 py-15.5">
        <div className="flex w-full max-w-[600px] flex-col items-center justify-center py-20">
          <h1 className="text-main-700 text-titleMedium mb-4">권한 없음</h1>
          <p className="text-gray-600 mb-6">참여한 프로젝트가 아닙니다.</p>
        </div>
      </div>
    );
  }

  const initialData = projectScoreEvidence?.evidence ? {
    projectId,
    evidenceId: projectScoreEvidence.evidence.evidenceId,
    scoreId: projectScoreEvidence.score.scoreId,
    title: projectScoreEvidence.evidence.title,
    content: projectScoreEvidence.evidence.content,
    files: projectScoreEvidence.evidence.files,
    scoreStatus: projectScoreEvidence.score.scoreStatus,
    rejectionReason: projectScoreEvidence.score.rejectionReason || undefined,
  } : draftEvidence ? {
    projectId,
    title: draftEvidence.title,
    content: draftEvidence.content,
    files: draftEvidence.files,
  } : { projectId };

  const mode = initialData.evidenceId ? 'edit' : 'create';
  const showDelete = !!initialData.evidenceId;

  const actions = {
    showDraft: mode === 'edit' ? false : true,
    showDelete,
  };

  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col items-start">
        <h1 className="text-main-700 text-titleMedium mb-9">프로젝트 참여</h1>
        <EvidenceForm
          mode={mode}
          initialData={initialData}
          actions={actions}
        />
      </div>
    </div>
  );
}
