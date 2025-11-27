'use client';

import { useActionState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useGetProjectById } from "@/entities/project/model/useGetProjectById";
import { useGetCurrentStudent } from "@/entities/student/model/useGetCurrentStudent";
import { handleProjectCreate } from "@/feature/project-create/lib/handleProjectCreate";
import { handleProjectEdit } from "@/feature/project-create/lib/handleProjectEdit";
import { createInitialState } from "@/shared/lib/createInitialState";
import Button from "@/shared/ui/Button";
import FileUploader from "@/shared/ui/FileUploader";
import Input from "@/shared/ui/Input";
import SearchDropdown from "@/shared/ui/SearchDropdown";
import Textarea from "@/shared/ui/Textarea";

import { CreateProjectFormValueType } from "../model/CreateProjectSchema";

export default function ProjectCreateForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const projectId = Number(useSearchParams().get('projectId'));

  const isEditMode = !!projectId && projectId > 0;

  const { data: project, isLoading } = useGetProjectById({ projectId });
  const { data: student } = useGetCurrentStudent();

  const hasPermission = (() => {
    if (!isEditMode) return true;
    if (!project || !student) return false;
    return project.ownerId === student.id;
  })();

  const handler = isEditMode ? handleProjectEdit : handleProjectCreate;
  const [state, formAction, isPending] = useActionState(handler, createInitialState<CreateProjectFormValueType>());

  useEffect(() => {
    if (state.message) {
      if (state.status === "success") {
        toast.success(state.message);
        queryClient.invalidateQueries({ queryKey: ['project'] });

        if (isEditMode) {
          router.push(`/project/${projectId}`);
        } else {
          router.push('/main');
        }
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router, queryClient, isEditMode, projectId]);

  if (isEditMode && isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isEditMode && !hasPermission) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-main-700 text-titleMedium mb-4">권한 없음</h1>
        <p className="text-gray-600 mb-6">이 프로젝트를 수정할 권한이 없습니다.</p>
        <Button onClick={() => router.back()}>돌아가기</Button>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-main-700 text-titleMedium mb-9">
        {isEditMode ? '프로젝트 수정' : '프로젝트'}
      </h1>
      <form className="flex flex-col w-full gap-16" action={formAction}>

        {isEditMode ? <input type="hidden" name="projectId" value={projectId} /> : null}

        <div className="flex flex-col gap-6">
          <Input name="title" placeholder="주제를 입력해주세요" label="주제" defaultValue={project?.title} />
          <small className="text-error pl-1">{state.fieldErrors?.title}</small>
          <SearchDropdown name="participantIds" placeholder="이름을 입력해주세요" label="팀원" selectedStudents={project?.participants} />
          <small className="text-error pl-1">{state.fieldErrors?.participantIds}</small>
          <Textarea name="description" placeholder="프로젝트 설명을 입력해주세요" label="프로젝트 설명" defaultValue={project?.description} />
          <small className="text-error pl-1">{state.fieldErrors?.description}</small>
          <FileUploader name="fileIds" placeholder="파일을 업로드해주세요" label="파일" uploadedFiles={project?.files} isMultiple />
          <small className="text-error pl-1">{state.fieldErrors?.fileIds}</small>
        </div>
        <div className="flex flex-col gap-[10px]">
          <Button type="submit">
            {isPending
              ? (isEditMode ? '수정 중...' : '작성 중...')
              : (isEditMode ? '수정 완료' : '작성 완료')
            }
          </Button>
        </div>
      </form>
    </>
  )
}
