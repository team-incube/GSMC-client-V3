'use client';

import { handleProjectParticipation } from '@/feature/project-participation/lib/handleProjectParticipation';
import { ParticipationProjectFormState } from '@/feature/project-participation/model/ParticipationProjectForm';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
import FileUploader from '@/shared/ui/FileUploader';
import Input from '@/shared/ui/Input';
import Textarea from '@/shared/ui/Textarea';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ProjectParticipationForm() {
  const [state, formAction, isPending] = useActionState(handleProjectParticipation, createInitialState<ParticipationProjectFormState>(),);

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
        <Textarea name="content" placeholder="내용을 입력해주세요" label="내용" />
        <small className="text-error pl-1">{state.fieldErrors?.content}</small>
        <FileUploader name="fileIds" label="파일" placeholder="파일을 업로드해주세요" />
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
  );
}
