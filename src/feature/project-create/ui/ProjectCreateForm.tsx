'use client';

import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { FileType } from '@/entities/file/model/file';
import { StudentType } from '@/entities/student/model/student';
import { ProjectFormSchema, ProjectFormValues } from '@/feature/project-create/model/projectForm.schema';
import { useOptimisticProjectMutation } from '@/feature/project-create/model/useOptimisticProjectMutation';
import Button from '@/shared/ui/Button';
import FileUploader from '@/shared/ui/FileUploader';
import Input from '@/shared/ui/Input';
import SearchDropdown from '@/shared/ui/SearchDropdown';
import Textarea from '@/shared/ui/Textarea';

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
  const newFilesRef = useRef<File[]>([]);

  const handleCreateSuccess = () => router.push(redirectOnSuccess);
  const handleUpdateSuccess = () => {
    if (initialData?.projectId) {
      router.push(`/project/${initialData.projectId}`);
    }
  };
  const handleDeleteSuccess = () => router.push('/main');
  const handleDraftSuccess = () => router.push(redirectOnSuccess);

  const { createProject, updateProject, draftProject, deleteProject } = useOptimisticProjectMutation();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    values: {
      projectId: initialData?.projectId,
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      participantIds: initialData?.participants?.map((p) => p.id) ?? [],
      fileIds: initialData?.files?.map((file) => Number(file.id)) ?? [],
      isDraft: initialData?.isDraft ?? false,
    },
  });

  const descriptionLength = watch('description')?.length ?? 0;
  const isDraft = initialData?.isDraft ?? false;

  const processSubmit = (data: ProjectFormValues, intent: string) => {
    if (intent === 'delete') {
      deleteProject({ projectId: data.projectId, isDraft }, handleDeleteSuccess);
      return;
    }

    const existingFileIds = data.fileIds.filter((id) => id > 0);

    const optimisticData = {
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      participantIds: data.participantIds,
      existingFileIds,
      newFiles: newFilesRef.current,
    };

    switch (intent) {
      case 'create':
        createProject(optimisticData, handleCreateSuccess);
        break;
      case 'update':
        updateProject(optimisticData, handleUpdateSuccess);
        break;
      case 'draft':
        draftProject(optimisticData, handleDraftSuccess);
        break;
    }
  };

  return (
    <form className="flex flex-col w-full gap-16" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-6">
        <Input
          label="제목"
          placeholder="제목을 입력해주세요"
          {...register('title')}
        />
        <small className="pl-1 text-error">{errors.title?.message}</small>

        <Controller
          name="participantIds"
          control={control}
          render={({ field }) => (
            <SearchDropdown
              label="팀원"
              placeholder="이름을 입력해주세요"
              selectedStudents={initialData?.participants}
              onChange={(students) => field.onChange(students.map((s) => s.id))}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.participantIds?.message}</small>

        <Textarea
          label="내용"
          placeholder="최소 300자, 최대 2000자 입력해주세요"
          description={`${descriptionLength}자 / 최소 300자 - 최대 2000자`}
          {...register('description')}
        />
        <small className="pl-1 text-error">{errors.description?.message}</small>

        <Controller
          name="fileIds"
          control={control}
          render={({ field }) => (
            <FileUploader
              label="이미지"
              placeholder="파일을 업로드해주세요"
              uploadedFiles={initialData?.files}
              accept={['.jpeg', '.jpg', '.png']}
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
            onClick={handleSubmit((data) => processSubmit(data, 'delete'))}
          >
            삭제
          </Button>
        )}
      </div>
    </form>
  );
}
