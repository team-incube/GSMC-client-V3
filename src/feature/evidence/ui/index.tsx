'use client';

import { useActionState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { FileType } from '@/entities/file/model/file';
import { handleEvidenceAction } from '@/feature/evidence/lib/handleEvidenceAction';
import { EvidenceFormValues } from '@/feature/evidence/model/evidenceForm.schema';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
import FileUploader from '@/shared/ui/FileUploader';
import Input from '@/shared/ui/Input';
import Textarea from '@/shared/ui/Textarea';

export interface EvidenceFormProps {
  mode?: 'create' | 'edit';
  initialData?: {
    projectId?: number;
    evidenceId?: number;
    scoreId?: number;
    title?: string;
    content?: string;
    files?: FileType[];
    fileIds?: number[];
  };

  actions?: {
    showDraft?: boolean;
    showDelete?: boolean;
  };

  redirectOnSuccess?: string;
}

export default function EvidenceForm({
  mode = 'create',
  initialData,
  actions = { showDraft: true, showDelete: false },
  redirectOnSuccess = '/main',
}: EvidenceFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [state, formAction, isPending] = useActionState(
    handleEvidenceAction,
    createInitialState<EvidenceFormValues>()
  );

  useEffect(() => {
    if (state.message) {
      if (state.status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['evidence'] });
        toast.success(state.message);
        if (redirectOnSuccess) {
          router.push(redirectOnSuccess);
        }
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router, redirectOnSuccess, queryClient]);

  return (
    <form className="flex w-full flex-col gap-16" action={formAction}>
      <div className="flex flex-col gap-6">
        <Input
          name="title"
          placeholder="제목을 입력해주세요"
          label="제목"
          defaultValue={initialData?.title}
        />
        <small className="pl-1 text-error">{state.fieldErrors?.title}</small>

        <Textarea
          name="content"
          placeholder="내용을 입력해주세요"
          label="내용"
          defaultValue={initialData?.content}
        />
        <small className="pl-1 text-error">{state.fieldErrors?.content}</small>

        <FileUploader
          name="fileIds"
          label="파일"
          placeholder="파일을 업로드해주세요"
          uploadedFiles={initialData?.files}
          isMultiple
        />
        <small className="pl-1 text-error">{state.fieldErrors?.fileIds}</small>

        {initialData?.projectId !== undefined && (
          <input type="hidden" name="projectId" value={initialData.projectId} />
        )}
        {initialData?.evidenceId !== undefined && (
          <input type="hidden" name="evidenceId" value={initialData.evidenceId} />
        )}
        {initialData?.scoreId !== undefined && (
          <input type="hidden" name="scoreId" value={initialData.scoreId} />
        )}
      </div>

      <div className="flex flex-col gap-[10px]">
        {actions.showDraft === true && (
          <Button type="submit" variant="border" name="intent" value="draft">
            임시저장
          </Button>
        )}

        <Button
          type="submit"
          disabled={isPending}
          name="intent"
          value={mode === 'create' ? 'create' : 'update'}
        >
          {isPending ? '처리 중...' : mode === 'create' ? '작성 완료' : '수정하기'}
        </Button>

        {actions.showDelete === true && (
          <Button
            type="submit"
            variant="border"
            className="text-error underline"
            name="intent"
            value="delete"
          >
            삭제
          </Button>
        )}
      </div>
    </form>
  );
}
