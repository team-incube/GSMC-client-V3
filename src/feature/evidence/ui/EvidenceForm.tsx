'use client';

import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { FileType } from '@/entities/file/model/file';
import { useAttachFiles } from '@/entities/file/model/useAttachFiles';
import { EvidenceFormSchema, EvidenceFormValues } from '@/feature/evidence/model/evidenceForm.schema';
import {
  EvidenceMutationData,
  useCreateEvidence,
  useDeleteEvidence,
  useDraftEvidence,
  useUpdateEvidence,
} from '@/feature/evidence/model/useEvidenceMutation';
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

  const handleSuccess = () => {
    if (redirectOnSuccess) {
      router.push(redirectOnSuccess);
    }
  };

  const { mutateAsync: attachFiles, isPending: isUploading } = useAttachFiles();
  const { mutate: createEvidence, isPending: isCreating } = useCreateEvidence(handleSuccess);
  const { mutate: updateEvidence, isPending: isUpdating } = useUpdateEvidence(handleSuccess);
  const { mutate: draftEvidence, isPending: isDrafting } = useDraftEvidence(handleSuccess);
  const { mutate: deleteEvidence, isPending: isDeleting } = useDeleteEvidence(handleSuccess);

  const isPending = isUploading || isCreating || isUpdating || isDrafting || isDeleting;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EvidenceFormValues>({
    resolver: zodResolver(EvidenceFormSchema),
    values: {
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
  const isDraftForm = watch('isDraft');

  const processSubmit = async (data: EvidenceFormValues, intent: string) => {
    if (intent === 'delete') {
      deleteEvidence({ scoreId: data.scoreId, evidenceId: data.evidenceId });
      return;
    }

    let fileIds = data.fileIds.filter((id) => id > 0);

    const newFilesCount = data.fileIds.filter((id) => id < 0).length;
    if (newFilesCount > 0) {
      const fileInput = document.querySelectorAll<HTMLInputElement>('input[name="newFiles"]');
      const newFiles: File[] = [];
      fileInput.forEach((input) => {
        if (input.files?.[0]) {
          newFiles.push(input.files[0]);
        }
      });

      if (newFiles.length > 0) {
        try {
          const uploadedFiles = await attachFiles(newFiles);
          fileIds = [...fileIds, ...uploadedFiles.map((f) => Number(f.id))];
        } catch {
          toast.error('파일 업로드에 실패했습니다.');
          return;
        }
      }
    }

    const mutationData: EvidenceMutationData = {
      projectId: data.projectId,
      evidenceId: data.evidenceId,
      scoreId: data.scoreId,
      title: data.title,
      content: data.content,
      fileIds,
    };

    switch (intent) {
      case 'create':
        createEvidence(mutationData);
        break;
      case 'update':
        updateEvidence(mutationData);
        break;
      case 'draft':
        draftEvidence({ title: data.title, content: data.content, fileIds });
        break;
    }
  };

  return (
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
          description={`${contentLength}/300`}
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
            disabled={isPending}
            onClick={() => {
              setValue('isDraft', true);
              handleSubmit((data) => processSubmit(data, 'draft'))();
            }}
          >
            {isPending && isDraftForm ? '저장 중...' : '임시저장'}
          </Button>
        )}

        <Button
          type="button"
          disabled={isPending}
          onClick={() => {
            setValue('isDraft', false);
            handleSubmit((data) => processSubmit(data, mode === 'create' ? 'create' : 'update'))();
          }}
        >
          {isPending && !isDraftForm ? '처리 중...' : mode === 'create' ? '작성 완료' : '수정하기'}
        </Button>

        {actions.showDelete === true && (
          <Button
            type="button"
            variant="border"
            className="text-error underline"
            onClick={handleSubmit((data) => processSubmit(data, 'delete'))}
          >
            삭제
          </Button>
        )}
      </div>
    </form>
  );
}
