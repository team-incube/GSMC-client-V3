'use client';

import { useActionState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useGetProjectById } from "@/entities/project/model/useGetProjectById";
import { handleProjectCreate } from "@/feature/project-create/lib/handleProjectCreate";
import { createInitialState } from "@/shared/lib/createInitialState";
import Button from "@/shared/ui/Button";
import FileUploader from "@/shared/ui/FileUploader";
import Input from "@/shared/ui/Input";
import SearchDropdown from "@/shared/ui/SearchDropdown";
import Textarea from "@/shared/ui/Textarea";

import { CreateProjectFormValueType } from "../model/CreateProjectSchema";

export default function ProjectCreateForm() {
  const [state, formAction, isPending] = useActionState(handleProjectCreate, createInitialState<CreateProjectFormValueType>())
  const router = useRouter();
  const projectId = Number(useSearchParams().get('projectId'));
  const { data: project } = useGetProjectById({ projectId });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state.message) {
      if (state.status === "success") {
        toast.success(state.message);
        queryClient.invalidateQueries({ queryKey: ['project'] });
        router.push('/main');
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router, queryClient]);

  return (
    <>
      <h1 className="text-main-700 text-titleMedium mb-9">프로젝트</h1>
      <form className="flex flex-col w-full gap-16" action={formAction}>
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
          <Button type="button" variant="border">
            임시저장
          </Button>
          <Button type="submit">
            {isPending ? '작성 중...' : '작성 완료'}
          </Button>
        </div>
      </form>
    </>
  )
}
