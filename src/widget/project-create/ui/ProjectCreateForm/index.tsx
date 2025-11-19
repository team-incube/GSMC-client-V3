'use client';

import { handleProjectCreate } from "@/feature/project-create/lib/handleProjectCreate";
import { CreateProjectFormState } from "@/feature/project-create/model/CreateProjectInitForm";
import { createInitialState } from "@/shared/lib/createInitialState";
import Button from "@/shared/ui/Button";
import FileUploader from "@/shared/ui/FileUploader";
import Input from "@/shared/ui/Input";
import SearchDropdown from "@/shared/ui/SearchDropdown";
import Textarea from "@/shared/ui/Textarea";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function ProjectCreateForm() {
  const [state, formAction, isPending] = useActionState(handleProjectCreate, createInitialState<CreateProjectFormState>())

  useEffect(() => {
    if (state.message) {
      if (state.status == "success") {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form className="flex flex-col w-full gap-16" action={formAction}>
      <div className="flex flex-col gap-6">
        <Input name="title" placeholder="주제를 입력해주세요" label="주제" />
        <small className="text-error pl-1">{state.fieldErrors?.title}</small>
        <SearchDropdown name="participantIds" placeholder="주제를 입력해주세요" label="팀원" />
        <small className="text-error pl-1">{state.fieldErrors?.participantIds}</small>
        <Textarea name="description" placeholder="내용을 입력해주세요" label="프로젝트 설명" />
        <small className="text-error pl-1">{state.fieldErrors?.description}</small>
        <FileUploader name="fileIds" placeholder="파일을 업로드해주세요" label="파일" />
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
  )
}
