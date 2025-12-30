'use client';

import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { FileType } from '@/entities/file/model/file';
import { EvidenceFormSchema, EvidenceFormValues } from '@/feature/evidence/model/evidenceForm.schema';
import { useOptimisticEvidenceMutation } from '@/feature/evidence/model/useOptimisticEvidenceMutation';
import Button from '@/shared/ui/Button';
import ConfirmModal from '@/shared/ui/ConfirmModal';
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const newFilesRef = useRef<File[]>([]);

  const { createEvidence, updateEvidence, draftEvidence, deleteEvidence } = useOptimisticEvidenceMutation();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EvidenceFormValues>({
    resolver: zodResolver(EvidenceFormSchema),
    defaultValues: {
      isDraft: false,
      projectId: initialData?.projectId,
      evidenceId: initialData?.evidenceId,
      scoreId: initialData?.scoreId,
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
      fileIds: initialData?.files?.map((file) => Number(file.id)) ?? [],
    },
  });

  const contentLength = watch('content')?.length ?? 0;

  const processSubmit = (data: EvidenceFormValues, intent: string) => {
    if (intent === 'delete') {
      deleteEvidence.mutate(
        {
          scoreId: data.scoreId,
          evidenceId: data.evidenceId,
          redirectPath: redirectOnSuccess,
        },
        {
          onSettled: () => {
            setShowDeleteConfirm(false);
          },
        }
      );
      return;
    }

    const existingFileIds = data.fileIds.filter((id) => id > 0);

    const optimisticData = {
      projectId: data.projectId,
      evidenceId: data.evidenceId,
      scoreId: data.scoreId,
      title: data.title,
      content: data.content,
      existingFileIds,
      newFiles: newFilesRef.current,
      redirectPath: redirectOnSuccess,
    };

    switch (intent) {
      case 'create':
        createEvidence.mutate(optimisticData);
        break;
      case 'update':
        updateEvidence.mutate(optimisticData);
        break;
      case 'draft':
        draftEvidence.mutate({
          title: data.title,
          content: data.content,
          existingFileIds,
          newFiles: newFilesRef.current,
          redirectPath: redirectOnSuccess,
        });
        break;
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    handleSubmit((data) => processSubmit(data, 'delete'))();
  };

  return (
    <>
      <form className="flex w-full flex-col gap-16" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-6">
          {initialData?.scoreStatus === 'REJECTED' && (
            <p className="text-error text-body2 font-bold -mb-4">탈락됨</p>
          )}
          <Input
            label="제목"
            placeholder="제목을 입력해주세요"
            {...register('title')}
          />
          <small className="pl-1 text-error">{errors.title?.message}</small>

          <Textarea
            label="내용"
            placeholder="최소 300자, 최대 2000자 입력해주세요"
            description={`${contentLength}자 / 최소 300자 - 최대 2000자`}
            {...register('content')}
          />
          <small className="pl-1 text-error">{errors.content?.message}</small>

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
                  const existingFileIds = files.existing.map((f) => Number(f.id));
                  const newFileIds = files.new.map((_, index) => -(index + 1));
                  field.onChange([...existingFileIds, ...newFileIds]);
                  newFilesRef.current = files.new;
                }}
              />
            )}
          />
          <small className="pl-1 text-error">{errors.fileIds?.message}</small>

          {initialData?.scoreStatus === 'REJECTED' && !!initialData.rejectionReason && (
            <Textarea label="반려 사유" readOnly defaultValue={initialData.rejectionReason} />
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          {actions.showDraft === true && (
            <Button
              type="button"
              variant="border"
              onClick={() => {
                setValue('isDraft', true);
                handleSubmit((data) => processSubmit(data, 'draft'))();
              }}
            >
              임시저장
            </Button>
          )}

          <Button
            type="button"
            onClick={() => {
              setValue('isDraft', false);
              handleSubmit((data) => processSubmit(data, mode === 'create' ? 'create' : 'update'))();
            }}
          >
            {mode === 'create' ? '작성 완료' : '수정하기'}
          </Button>

          {actions.showDelete === true && (
            <Button
              type="button"
              variant="border"
              className="text-error underline"
              onClick={handleDeleteClick}
            >
              삭제
            </Button>
          )}
        </div>
      </form>

      {showDeleteConfirm ? <ConfirmModal
        title="증빙 삭제"
        message="정말 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
      /> : null}
    </>
  );
}