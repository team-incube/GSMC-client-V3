'use client';

import { startTransition, useActionState, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { FileType } from '@/entities/file/model/file';
import { StudentType } from '@/entities/student/model/student';
import { handleProjectAction } from '@/feature/project-create/lib/handleProjectAction';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
import FileUploader from '@/shared/ui/FileUploader';
import Input from '@/shared/ui/Input';
import SearchDropdown from '@/shared/ui/SearchDropdown';
import Textarea from '@/shared/ui/Textarea';

import { ProjectFormSchema, ProjectFormValues } from '../model/projectForm.schema';

export interface ProjectCreateFormProps {
  mode?: 'create' | 'edit';
  initialData?: {
    projectId?: number;
    title?: string;
    description?: string;
    files?: FileType[];
    participants?: StudentType[];
    isDraft?: boolean;
  };
  actions?: {
    showDraft?: boolean;
    showDelete?: boolean;
  };
  redirectOnSuccess?: string;
}

export default function ProjectCreateForm({
  mode = 'create',
  initialData,
  actions = { showDraft: true, showDelete: false },
  redirectOnSuccess = '/main',
}: ProjectCreateFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    handleProjectAction,
    createInitialState<ProjectFormValues>(),
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    values: {
      projectId: initialData?.projectId,
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      participantIds: initialData?.participants?.map(p => p.id) ?? [],
      fileIds: initialData?.files?.map(file => Number(file.id)) ?? [],
      isDraft: initialData?.isDraft,
    },
  });

  const descriptionLength = watch('description')?.length ?? 0;

  useEffect(() => {
    if (state.message) {
      if (state.status === 'success') {
        toast.success(state.message);
        queryClient.invalidateQueries({ queryKey: ['project'] });
        queryClient.invalidateQueries({ queryKey: ['draftProject'] });

        if (state.message === '삭제되었습니다.') {
          router.push('/main');
        } else if (mode === 'edit' && initialData?.projectId) {
          router.push(`/project/${initialData.projectId}`);
        } else {
          router.push(redirectOnSuccess);
        }
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router, queryClient, mode, initialData, redirectOnSuccess]);

  const onSubmit = (data: ProjectFormValues, intent: string) => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    formData.set('intent', intent);
    formData.set('title', data.title);
    formData.set('description', data.description);

    formData.delete('participantIds');
    data.participantIds.forEach(id => formData.append('participantIds', id.toString()));

    if (data.projectId !== undefined) {
      formData.set('projectId', data.projectId.toString());
    }
    if (data.isDraft !== undefined) {
      formData.set('isDraft', data.isDraft.toString());
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  const isDraft = initialData?.isDraft ?? false;
  const activeProjectId = initialData?.projectId ?? 0;

  return (
    <form
      ref={formRef}
      className="flex flex-col w-full gap-16"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-6">
        <Input
          label="제목"
          placeholder="제목을 입력해주세요"
          {...register('title')}
        />
        <small className="pl-1 text-error">{errors.title?.message || state.fieldErrors?.title}</small>

        <Controller
          name="participantIds"
          control={control}
          render={({ field }) => (
            <SearchDropdown
              label="팀원"
              placeholder="이름을 입력해주세요"
              selectedStudents={initialData?.participants}
              onChange={(students) => field.onChange(students.map(s => s.id))}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.participantIds?.message || state.fieldErrors?.participantIds}</small>

        <Textarea
          label='프로젝트 설명'
          placeholder="최소 300자, 최대 2000자 입력해주세요"
          description={`${descriptionLength}/300`}
          {...register('description')}
        />
        <small className="pl-1 text-error">{errors.description?.message || state.fieldErrors?.description}</small>

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

        {initialData?.projectId !== undefined && <input type="hidden" name="projectId" value={activeProjectId} />}
        {initialData?.isDraft !== undefined && <input type="hidden" name="isDraft" value={String(isDraft)} />}

      </div>
      <div className="flex flex-col gap-[10px]">
        {actions.showDraft === true && (
          <Button
            type="button"
            variant="border"
            onClick={handleSubmit((data: ProjectFormValues) => onSubmit(data, 'draft'))}
          >
            임시저장
          </Button>
        )}

        <Button
          type="button"
          disabled={isPending}
          onClick={handleSubmit((data: ProjectFormValues) => onSubmit(data, mode === 'create' ? 'create' : 'update'))}
        >
          {isPending ? '처리 중...' : mode === 'create' ? '작성 완료' : '수정하기'}
        </Button>

        {actions.showDelete === true && (
          <Button
            type="button"
            variant="border"
            className="text-error underline"
            onClick={handleSubmit((data: ProjectFormValues) => onSubmit(data, 'delete'))}
          >
            삭제
          </Button>
        )}
      </div>
    </form>
  );
}
