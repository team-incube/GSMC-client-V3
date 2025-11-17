'use client';

import {
  handleProjectSubmit,
  initialState,
  type SubmitState,
} from '@/feature/add-project/lib/handleProjectSubmit';
import Button from '@/shared/ui/Button';
import FileUploader from '@/shared/ui/FileUploader';
import Input from '@/shared/ui/Input';
import Textarea from '@/shared/ui/Textarea';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ProjectForm() {
  const [state, formAction, isPending] = useActionState<SubmitState, FormData>(
    handleProjectSubmit,
    initialState,
  );

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state.message, state.success]);

  return (
    <form className="flex flex-col gap-16" action={formAction}>
      <div className="flex flex-col gap-6">
        <Input name="title" placeholder="주제를 입력해주세요" label="주제" />
        {!!state.titleError && <p className="text-xs text-red-500">{state.titleError}</p>}
        <Textarea name="content" placeholder="내용을 입력해주세요" label="내용" />
        {!!state.contentError && <p className="text-xs text-red-500">{state.contentError}</p>}
        <FileUploader name="image" label="이미지" placeholder="파일첨부" />
        {!!state.fileError && <p className="text-xs text-red-500">{state.fileError}</p>}
      </div>

      <div className="flex flex-col gap-[10px]">
        <Button type="button" variant="border">
          임시저장
        </Button>
        <Button type="submit" disabled={Boolean(isPending && state.success)}>
          {isPending ? '작성 중...' : '작성 완료'}
        </Button>
      </div>
    </form>
  );
}
