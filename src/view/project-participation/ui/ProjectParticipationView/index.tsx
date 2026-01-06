'use client';

import { useSearchParams } from 'next/navigation';

import { useGetDraftEvidence } from '@/entities/evidence/model/useGetDraftEvidence';
import { useGetProjectById } from '@/entities/project/model/useGetProjectById';
import { useGetProjectMyScoreById } from '@/entities/project/model/useGetProjectMyScoreById';
import { useGetCurrentStudent } from '@/entities/student/model/useGetCurrentStudent';
import EvidenceForm from '@/feature/evidence/ui';
import Button from '@/shared/ui/Button';

export default function ProjectParticipationView() {
  const projectId = Number(useSearchParams().get('projectId'));
  const { data: project } = useGetProjectById({ projectId });
  const { data: student } = useGetCurrentStudent();

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

  return <ProjectParticipationContent projectId={projectId} />;
}

const ProjectParticipationContent = ({ projectId }: { projectId: number }) => {
  const { data: projectScoreEvidence } = useGetProjectMyScoreById({ projectId });
  const { data: draftEvidence } = useGetDraftEvidence();

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
};

const Loading = () => {
  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col items-start animate-pulse">
        <div className="h-8 w-40 bg-gray-200 rounded mb-9" />
        <div className="w-full space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-12 w-full bg-gray-100 rounded-lg border border-gray-100" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-40 w-full bg-gray-100 rounded-lg border border-gray-100" />
          </div>
          <div className="h-12 w-full bg-gray-200 rounded mt-8" />
        </div>
      </div>
    </div>
  );
};

const ErrorFallback = () => {
  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col items-center justify-center h-[400px] gap-4">
        <p className="text-error font-semibold text-lg">참여 정보를 불러오는데 실패했습니다.</p>
        <Button onClick={() => window.location.reload()} variant="border">다시 시도</Button>
      </div>
    </div>
  );
};

ProjectParticipationView.Loading = Loading;
ProjectParticipationView.Error = ErrorFallback;
