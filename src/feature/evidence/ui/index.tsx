'use client';

import { startTransition, useActionState, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { FileType } from '@/entities/file/model/file';
import { handleEvidenceAction } from '@/feature/evidence/lib/handleEvidenceAction';
import { EvidenceFormSchema, EvidenceFormValues } from '@/feature/evidence/model/evidenceForm.schema';
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
    scoreStatus?: string;
    rejectionReason?: string;
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
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    handleEvidenceAction,
    createInitialState<EvidenceFormValues>()
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EvidenceFormValues>({
    resolver: zodResolver(EvidenceFormSchema),
    values: {
      projectId: initialData?.projectId,
      evidenceId: initialData?.evidenceId,
      scoreId: initialData?.scoreId,
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
      fileIds: initialData?.files?.map((file) => Number(file.id)) ?? [],
    },
  });

  const contentLength = watch('content')?.length ?? 0;

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

  const onSubmit = (data: EvidenceFormValues, intent: string) => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    formData.set('intent', intent);
    formData.set('title', data.title);
    formData.set('content', data.content);

    if (data.projectId !== undefined) {
      formData.set('projectId', data.projectId.toString());
    }
    if (data.evidenceId !== undefined) {
      formData.set('evidenceId', data.evidenceId.toString());
    }
    if (data.scoreId !== undefined) {
      formData.set('scoreId', data.scoreId.toString());
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form
      ref={formRef}
      className="flex w-full flex-col gap-16"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-6">
        {initialData?.scoreStatus === 'REJECTED' && (
          <p className="text-error text-body2 font-bold -mb-4">탈락됨</p>
        )}
        <Input
          label="제목"
          placeholder="제목을 입력해주세요"
          {...register('title')}
        />
        <small className="pl-1 text-error">{errors.title?.message || state.fieldErrors?.title}</small>

        <Textarea
          label="내용"
          placeholder="최소 300자, 최대 2000자 입력해주세요"
          description={`${contentLength}/300`}
          {...register('content')}
        />
        <small className="pl-1 text-error">{errors.content?.message || state.fieldErrors?.content}</small>

        <Controller
          name="fileIds"
          control={control}
          render={({ field }) => (
            <FileUploader
              label="파일"
              placeholder="파일을 업로드해주세요"
              uploadedFiles={initialData?.files}
              isMultiple
              onChange={(files) => {
                const existingFileIds = files.existing.map(f => Number(f.id));
                const newFileIds = files.new.map((_, index) => -(index + 1));
                const allFileIds = [...existingFileIds, ...newFileIds];
                field.onChange(allFileIds);
              }}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.fileIds?.message || state.fieldErrors?.fileIds}</small>

        {initialData?.projectId !== undefined && (
          <input type="hidden" name="projectId" value={initialData.projectId} />
        )}
        {initialData?.evidenceId !== undefined && (
          <input type="hidden" name="evidenceId" value={initialData.evidenceId} />
        )}
        {initialData?.scoreId !== undefined && (
          <input type="hidden" name="scoreId" value={initialData.scoreId} />
        )}

        {initialData?.scoreStatus === 'REJECTED' && !!initialData.rejectionReason && (
          <Textarea
            label="반려 사유"
            readOnly
            defaultValue={initialData.rejectionReason}
          />
        )}
      </div>

      <div className="flex flex-col gap-[10px]">
        {actions.showDraft === true && (
          <Button
            type="button"
            variant="border"
            onClick={handleSubmit((data: EvidenceFormValues) => onSubmit(data, 'draft'))}
          >
            임시저장
          </Button>
        )}

        <Button
          type="button"
          disabled={isPending}
          onClick={handleSubmit((data: EvidenceFormValues) => onSubmit(data, mode === 'create' ? 'create' : 'update'))}
        >
          {isPending ? '처리 중...' : mode === 'create' ? '작성 완료' : '수정하기'}
        </Button>

        {actions.showDelete === true && (
          <Button
            type="button"
            variant="border"
            className="text-error underline"
            onClick={handleSubmit((data: EvidenceFormValues) => onSubmit(data, 'delete'))}
          >
            삭제
          </Button>
        )}
      </div>
    </form>
  );
}
