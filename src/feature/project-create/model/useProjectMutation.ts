import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'sonner';

import { createDraftProject } from '@/entities/project/api/createDraftProject';
import { createProject } from '@/entities/project/api/createProject';
import { editProjectById } from '@/entities/project/api/editProjectById';
import { removeDraftProject } from '@/entities/project/api/removeDraftProject';
import { removeProjectById } from '@/entities/project/api/removeProjectById';

export interface ProjectMutationData {
  projectId?: number;
  title: string;
  description: string;
  fileIds: number[];
  participantIds: number[];
  isDraft?: boolean;
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

export const useCreateProject = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProjectMutationData) => {
      await createProject({
        title: data.title,
        description: data.description,
        fileIds: data.fileIds,
        participantIds: data.participantIds,
      });
      await removeDraftProject();
    },
    onSuccess: () => {
      toast.success('프로젝트를 생성했습니다.');
      queryClient.invalidateQueries({ queryKey: ['project'] });
      queryClient.invalidateQueries({ queryKey: ['draftProject'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(handleProjectError(error));
    },
  });
};

export const useUpdateProject = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProjectMutationData) => {
      if (data.projectId === undefined) {
        throw new Error('Project ID is required');
      }

      await editProjectById({
        projectId: data.projectId,
        title: data.title,
        description: data.description,
        fileIds: data.fileIds,
        participantIds: data.participantIds,
      });
    },
    onSuccess: () => {
      toast.success('프로젝트를 수정했습니다.');
      queryClient.invalidateQueries({ queryKey: ['project'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(handleProjectError(error));
    },
  });
};

export const useDraftProject = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProjectMutationData) => {
      await createDraftProject({
        title: data.title,
        description: data.description,
        fileIds: data.fileIds,
        participantIds: data.participantIds,
      });
    },
    onSuccess: () => {
      toast.success('임시저장되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['draftProject'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(handleProjectError(error));
    },
  });
};

export const useDeleteProject = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { projectId?: number; isDraft: boolean }) => {
      if (data.isDraft) {
        await removeDraftProject();
      } else {
        if (data.projectId === undefined) {
          throw new Error('Project ID is required');
        }
        await removeProjectById({ projectId: data.projectId });
      }
    },
    onSuccess: () => {
      toast.success('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['project'] });
      queryClient.invalidateQueries({ queryKey: ['draftProject'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(handleProjectError(error));
    },
  });
};
