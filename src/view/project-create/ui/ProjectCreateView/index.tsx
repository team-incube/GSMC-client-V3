'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useGetDraftProject } from '@/entities/project/model/useGetDraftProject';
import { useGetProjectById } from '@/entities/project/model/useGetProjectById';
import { useGetCurrentStudent } from '@/entities/student/model/useGetCurrentStudent';
import ProjectCreateForm from '@/feature/project-create/ui';
import Button from '@/shared/ui/Button';

export default function ProjectCreateView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get('projectId'));
  const isEditMode = !!projectId && projectId > 0;

  const { data: project } = useGetProjectById({ projectId });
  const { data: draftProject } = useGetDraftProject();
  const { data: student } = useGetCurrentStudent();

  const hasPermission = (() => {
    if (!isEditMode) return true;
    if (!project || !student) return false;
    return project.ownerId === student.id;
  })();

  if (isEditMode && !hasPermission) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-main-700 text-titleMedium mb-4">권한 없음</h1>
        <p className="text-gray-600 mb-6">이 프로젝트를 수정할 권한이 없습니다.</p>
        <Button onClick={() => router.back()}>돌아가기</Button>
      </div>
    );
  }

  const activeProject = isEditMode ? project : draftProject;
  const isDraft = !isEditMode && !!draftProject;

  const initialData = {
    projectId: isEditMode ? projectId : (draftProject?.id ?? 0),
    title: activeProject?.title,
    description: activeProject?.description,
    files: activeProject?.files,
    participants: activeProject?.participants,
    isDraft: isDraft,
  };

  const mode = isEditMode ? 'edit' : 'create';

  const actions = {
    showDraft: mode === 'edit' ? false : true,
    showDelete: isDraft,
  };

  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col items-start">
        <h1 className="text-main-700 text-titleMedium mb-9">
          {mode === 'edit' ? '프로젝트 수정' : isDraft ? '임시 저장된 프로젝트' : '프로젝트'}
        </h1>
        <ProjectCreateForm
          mode={mode}
          initialData={initialData}
          actions={actions}
        />
      </div>
    </div>
  );
}

const Loading = () => {
  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col items-start animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-9" />
        <div className="w-full space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-12 w-full bg-gray-100 rounded-lg border border-gray-100" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-32 w-full bg-gray-100 rounded-lg border border-gray-100" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-20 w-full bg-gray-100 rounded-lg border border-gray-100" />
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
      <div className="flex w-full max-w-[600px] flex-col items-center justify-center py-20 gap-4">
        <p className="text-error font-semibold text-lg">정보를 불러오는데 실패했습니다.</p>
        <Button onClick={() => window.location.reload()} variant="border">다시 시도</Button>
      </div>
    </div>
  );
};

ProjectCreateView.Loading = Loading;
ProjectCreateView.Error = ErrorFallback;
