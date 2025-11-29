'use client';

import { Suspense } from 'react';

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

  const { data: project, isLoading: isProjectLoading } = useGetProjectById({ projectId });
  const { data: draftProject, isLoading: isDraftLoading } = useGetDraftProject();
  const { data: student } = useGetCurrentStudent();

  const isLoading = (isEditMode && isProjectLoading) || (!isEditMode && isDraftLoading);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

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
    showDraft: true,
    showDelete: isDraft,
  };

  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col items-start">
        <h1 className="text-main-700 text-titleMedium mb-9">
          {mode === 'edit' ? '프로젝트 수정' : isDraft ? '임시 저장된 프로젝트' : '프로젝트'}
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectCreateForm
            mode={mode}
            initialData={initialData}
            actions={actions}
          />
        </Suspense>
      </div>
    </div>
  );
}
