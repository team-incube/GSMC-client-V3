'use client';

import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { FileType } from '@/entities/file/model/file';
import { useAttachFiles } from '@/entities/file/model/useAttachFiles';
import { StudentType } from '@/entities/student/model/student';
import { ProjectFormSchema, ProjectFormValues } from '@/feature/project-create/model/projectForm.schema';
import {
  ProjectMutationData,
  useCreateProject,
  useDeleteProject,
  useDraftProject,
  useUpdateProject,
} from '@/feature/project-create/model/useProjectMutation';
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

  const handleCreateSuccess = () => router.push(redirectOnSuccess);
  const handleUpdateSuccess = () => {
    if (initialData?.projectId) {
      router.push(`/project/${initialData.projectId}`);
    }
  };
  const handleDeleteSuccess = () => router.push('/main');
  const handleDraftSuccess = () => router.push(redirectOnSuccess);

  const { mutateAsync: attachFiles, isPending: isUploading } = useAttachFiles();
  const { mutate: createProject, isPending: isCreating } = useCreateProject(handleCreateSuccess);
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject(handleUpdateSuccess);
  const { mutate: draftProject, isPending: isDrafting } = useDraftProject(handleDraftSuccess);
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject(handleDeleteSuccess);

  const isPending = isUploading || isCreating || isUpdating || isDrafting || isDeleting;

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
  const isDraftForm = watch('isDraft');
  const isDraft = initialData?.isDraft ?? false;

  const processSubmit = async (data: ProjectFormValues, intent: string) => {
    if (intent === 'delete') {
      deleteProject({ projectId: data.projectId, isDraft });
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

    const mutationData: ProjectMutationData = {
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      fileIds,
      participantIds: data.participantIds,
    };

    switch (intent) {
      case 'create':
        createProject(mutationData);
        break;
      case 'update':
        updateProject(mutationData);
        break;
      case 'draft':
        draftProject(mutationData);
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
          label="프로젝트 설명"
          placeholder="최소 300자, 최대 2000자 입력해주세요"
          description={`${descriptionLength}/300`}
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
