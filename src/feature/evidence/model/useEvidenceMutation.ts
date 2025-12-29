import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'sonner';

import { addDraftEvidence } from '@/entities/evidence/api/addDraftEvidence';
import { addEvidence } from '@/entities/evidence/api/addEvidence';
import { editEvidenceById } from '@/entities/evidence/api/editEvidenceById';
import { removeDraftEvidence } from '@/entities/evidence/api/removeDraftEvidence';
import { removeEvidence } from '@/entities/evidence/api/removeEvidence';
import { addProjectScore } from '@/entities/score/api/addProjectScore';
import { removeScoreById } from '@/entities/score/api/removeScoreById';

export interface EvidenceMutationData {
  projectId?: number;
  evidenceId?: number;
  scoreId?: number;
  title: string;
  content: string;
  fileIds: number[];
}

const handleEvidenceError = (error: unknown): string => {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status === HttpStatusCode.Forbidden) return '권한이 없습니다.';
    if (status === HttpStatusCode.NotFound) return '존재하지 않는 데이터입니다.';
    if (status === HttpStatusCode.Conflict) return '이미 참여한 프로젝트입니다.';
  }
  return '작업에 실패했습니다.';
};

export const useCreateEvidence = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EvidenceMutationData) => {
      if (!data.projectId) throw new Error('Project ID is required');

      const scoreResponse = await addProjectScore({ projectId: data.projectId });

      try {
        await addEvidence({
          scoreId: scoreResponse.scoreId,
          title: data.title,
          content: data.content,
          fileIds: data.fileIds,
        });
        await removeDraftEvidence();
      } catch (error) {
        await removeScoreById({ scoreId: scoreResponse.scoreId });
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('프로젝트 참여글을 작성했습니다.');
      queryClient.invalidateQueries({ queryKey: ['evidence'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(handleEvidenceError(error));
    },
  });
};

export const useUpdateEvidence = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EvidenceMutationData) => {
      if (!data.evidenceId || !data.scoreId) {
        throw new Error('Evidence ID and Score ID are required');
      }

      await editEvidenceById({
        evidenceId: data.evidenceId,
        scoreId: data.scoreId,
        title: data.title,
        content: data.content,
        fileIds: data.fileIds,
      });
    },
    onSuccess: () => {
      toast.success('수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['evidence'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(handleEvidenceError(error));
    },
  });
};

export const useDraftEvidence = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Pick<EvidenceMutationData, 'title' | 'content' | 'fileIds'>) => {
      await addDraftEvidence({
        title: data.title,
        content: data.content,
        fileIds: data.fileIds,
      });
    },
    onSuccess: () => {
      toast.success('임시저장되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['evidence'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(handleEvidenceError(error));
    },
  });
};

export const useDeleteEvidence = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { scoreId?: number; evidenceId?: number }) => {
      if (data.scoreId && data.evidenceId) {
        await removeScoreById({ scoreId: data.scoreId });
        await removeEvidence({ evidenceId: data.evidenceId });
      } else {
        await removeDraftEvidence();
      }
    },
    onSuccess: () => {
      toast.success('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['evidence'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(handleEvidenceError(error));
    },
  });
};
