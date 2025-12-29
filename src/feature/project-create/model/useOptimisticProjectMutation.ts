import { useRef } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  redirectPath?: string;
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
  const router = useRouter();
  const toastIdRef = useRef<string | number | undefined>(undefined);
  const fileUploadMutation = useOptimisticFileUpload();

  const createProjectMutation = useMutation({
    mutationFn: async (data: OptimisticProjectData) => {
      const uploadedFileIds = await fileUploadMutation.mutateAsync(data.newFiles);
      const fileIds = [...data.existingFileIds, ...uploadedFileIds];

      await createProject({
        title: data.title,
        description: data.description,
        fileIds,
        participantIds: data.participantIds,
      });
      await removeDraftProject();
    },
    onMutate: async (data) => {
      toastIdRef.current = toast.loading('프로젝트를 생성하는 중...');

      if (data.redirectPath) {
        router.push(data.redirectPath);
      }
    },
    onSuccess: () => {
      toast.success('프로젝트를 생성했습니다.', { id: toastIdRef.current });
      queryClient.invalidateQueries({ queryKey: ['project'] });
      queryClient.invalidateQueries({ queryKey: ['draftProject'] });
    },
    onError: (error) => {
      toast.error(handleProjectError(error), { id: toastIdRef.current });
    },
  });

  const updateProject = useMutation({
    mutationFn: async (data: OptimisticProjectData) => {
      if (data.projectId === undefined) throw new Error('프로젝트 ID가 필요합니다.');

      const uploadedFileIds = await fileUploadMutation.mutateAsync(data.newFiles);
      const fileIds = [...data.existingFileIds, ...uploadedFileIds];

      await editProjectById({
        projectId: data.projectId,
        title: data.title,
        description: data.description,
        fileIds,
        participantIds: data.participantIds,
      });
    },
    onMutate: async (data) => {
      toastIdRef.current = toast.loading('프로젝트를 수정하는 중...');

      if (data.redirectPath) {
        router.push(data.redirectPath);
      }
    },
    onSuccess: () => {
      toast.success('프로젝트를 수정했습니다.', { id: toastIdRef.current });
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
    onError: (error) => {
      toast.error(handleProjectError(error), { id: toastIdRef.current });
    },
  });

  const draftProject = useMutation({
    mutationFn: async (data: OptimisticProjectData) => {
      const uploadedFileIds = await fileUploadMutation.mutateAsync(data.newFiles);
      const fileIds = [...data.existingFileIds, ...uploadedFileIds];

      await createDraftProject({
        title: data.title,
        description: data.description,
        fileIds,
        participantIds: data.participantIds,
      });
    },
    onMutate: async (data) => {
      toastIdRef.current = toast.loading('임시저장하는 중...');

      if (data.redirectPath) {
        router.push(data.redirectPath);
      }
    },
    onSuccess: () => {
      toast.success('임시저장되었습니다.', { id: toastIdRef.current });
      queryClient.invalidateQueries({ queryKey: ['draftProject'] });
    },
    onError: (error) => {
      toast.error(handleProjectError(error), { id: toastIdRef.current });
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (data: { projectId?: number; isDraft: boolean; redirectPath?: string }) => {
      if (data.isDraft) {
        await removeDraftProject();
      } else {
        if (data.projectId === undefined) throw new Error('Project ID is required');
        await removeProjectById({ projectId: data.projectId });
      }
    },
    onMutate: async (data) => {
      toastIdRef.current = toast.loading('삭제하는 중...');

      if (data.redirectPath) {
        router.push(data.redirectPath);
      }
    },
    onSuccess: () => {
      toast.success('삭제되었습니다.', { id: toastIdRef.current });
      queryClient.invalidateQueries({ queryKey: ['project'] });
      queryClient.invalidateQueries({ queryKey: ['draftProject'] });
    },
    onError: (error) => {
      toast.error(handleProjectError(error), { id: toastIdRef.current });
    },
  });

  return {
    createProject: createProjectMutation,
    updateProject,
    draftProject,
    deleteProject,
  };
};
