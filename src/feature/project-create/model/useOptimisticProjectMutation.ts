import { useCallback, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'sonner';

import { useOptimisticFileUpload } from '@/entities/file/model/useOptimisticFileUpload';
import { createDraftProject } from '@/entities/project/api/createDraftProject';
import { createProject } from '@/entities/project/api/createProject';
import { editProjectById } from '@/entities/project/api/editProjectById';
import { removeDraftProject } from '@/entities/project/api/removeDraftProject';
import { removeProjectById } from '@/entities/project/api/removeProjectById';

export interface OptimisticProjectData {
  projectId?: number;
  title: string;
  description: string;
  participantIds: number[];
  existingFileIds: number[];
  newFiles: File[];
}

const handleProjectError = (error: unknown): string => {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status === HttpStatusCode.Forbidden) return '권한이 없습니다.';
    if (status === HttpStatusCode.NotFound) return '존재하지 않는 프로젝트입니다.';
    if (status === HttpStatusCode.BadRequest) return '잘못된 요청입니다.';
  }
  return '작업에 실패했습니다.';
};

export const useOptimisticProjectMutation = () => {
  const queryClient = useQueryClient();
  const toastIdRef = useRef<string | number | undefined>(undefined);
  const { mutateAsync: uploadFiles } = useOptimisticFileUpload();
  const createProjectMutation = useCallback(
    async (data: OptimisticProjectData, onSuccess: () => void) => {
      onSuccess();
      toastIdRef.current = toast.loading('프로젝트를 생성하는 중...');
      try {
        const uploadedFileIds = await uploadFiles(data.newFiles);
        const fileIds = [...data.existingFileIds, ...uploadedFileIds];
        await createProject({
          title: data.title,
          description: data.description,
          fileIds,
          participantIds: data.participantIds,
        });
        await removeDraftProject();
        await queryClient.invalidateQueries({ queryKey: ['project'] });
        await queryClient.invalidateQueries({ queryKey: ['draftProject'] });
        toast.success('프로젝트를 생성했습니다.', { id: toastIdRef.current });
      } catch (error) {
        toast.error(handleProjectError(error), { id: toastIdRef.current });
      }
    },
    [queryClient, uploadFiles],
  );
  const updateProject = useCallback(
    async (data: OptimisticProjectData, onSuccess: () => void) => {
      if (data.projectId === undefined) {
        toast.error('프로젝트 ID가 필요합니다.');
        return;
      }
      onSuccess();
      toastIdRef.current = toast.loading('프로젝트를 수정하는 중...');
      try {
        const uploadedFileIds = await uploadFiles(data.newFiles);
        const fileIds = [...data.existingFileIds, ...uploadedFileIds];
        await editProjectById({
          projectId: data.projectId,
          title: data.title,
          description: data.description,
          fileIds,
          participantIds: data.participantIds,
        });
        await queryClient.invalidateQueries({ queryKey: ['project'] });
        toast.success('프로젝트를 수정했습니다.', { id: toastIdRef.current });
      } catch (error) {
        toast.error(handleProjectError(error), { id: toastIdRef.current });
      }
    },
    [queryClient, uploadFiles],
  );
  const draftProject = useCallback(
    async (data: OptimisticProjectData, onSuccess: () => void) => {
      onSuccess();
      toastIdRef.current = toast.loading('임시저장하는 중...');
      try {
        const uploadedFileIds = await uploadFiles(data.newFiles);
        const fileIds = [...data.existingFileIds, ...uploadedFileIds];
        await createDraftProject({
          title: data.title,
          description: data.description,
          fileIds,
          participantIds: data.participantIds,
        });
        await queryClient.invalidateQueries({ queryKey: ['draftProject'] });
        toast.success('임시저장되었습니다.', { id: toastIdRef.current });
      } catch (error) {
        toast.error(handleProjectError(error), { id: toastIdRef.current });
      }
    },
    [queryClient, uploadFiles],
  );
  const deleteProject = useCallback(
    async (data: { projectId?: number; isDraft: boolean }, onSuccess: () => void) => {
      onSuccess();
      toastIdRef.current = toast.loading('삭제하는 중...');
      try {
        if (data.isDraft) {
          await removeDraftProject();
        } else {
          if (data.projectId === undefined) {
            throw new Error('Project ID is required');
          }
          await removeProjectById({ projectId: data.projectId });
        }
        await queryClient.invalidateQueries({ queryKey: ['project'] });
        await queryClient.invalidateQueries({ queryKey: ['draftProject'] });
        toast.success('삭제되었습니다.', { id: toastIdRef.current });
      } catch (error) {
        toast.error(handleProjectError(error), { id: toastIdRef.current });
      }
    },
    [queryClient],
  );
  return {
    createProject: createProjectMutation,
    updateProject,
    draftProject,
    deleteProject,
  };
};
