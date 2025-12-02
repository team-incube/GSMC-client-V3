'use client';

import { useActionState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

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

import { ProjectFormValues } from '../model/projectForm.schema';

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

  const [state, formAction, isPending] = useActionState(
    handleProjectAction,
    createInitialState<ProjectFormValues>(),
  );

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

  const isDraft = initialData?.isDraft ?? false;
  const activeProjectId = initialData?.projectId ?? 0;

  return (
    <form className="flex flex-col w-full gap-16" action={formAction}>
      <div className="flex flex-col gap-6">
        <Input
          name="title"
          placeholder="주제를 입력해주세요"
          label="주제"
          defaultValue={initialData?.title}
        />
        <small className="pl-1 text-error">{state.fieldErrors?.title}</small>

        <SearchDropdown
          name="participantIds"
          placeholder="이름을 입력해주세요"
          label="팀원"
          selectedStudents={initialData?.participants}
        />
        <small className="pl-1 text-error">{state.fieldErrors?.participantIds}</small>

        <Textarea
          name="description"
          placeholder="프로젝트 설명을 입력해주세요"
          label="프로젝트 설명"
          defaultValue={initialData?.description}
        />
        <small className="pl-1 text-error">{state.fieldErrors?.description}</small>

        <FileUploader
          name="fileIds"
          placeholder="파일을 업로드해주세요"
          label="파일"
          uploadedFiles={initialData?.files}
          isMultiple
        />
        <small className="pl-1 text-error">{state.fieldErrors?.fileIds}</small>

        {initialData?.projectId !== undefined && <input type="hidden" name="projectId" value={activeProjectId} />}
        {initialData?.isDraft !== undefined && <input type="hidden" name="isDraft" value={String(isDraft)} />}

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
