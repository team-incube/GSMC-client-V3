import { useRef } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'sonner';

import { addDraftEvidence } from '@/entities/evidence/api/addDraftEvidence';
import { addEvidence } from '@/entities/evidence/api/addEvidence';
import { editEvidenceById } from '@/entities/evidence/api/editEvidenceById';
import { removeDraftEvidence } from '@/entities/evidence/api/removeDraftEvidence';
import { removeEvidence } from '@/entities/evidence/api/removeEvidence';
import { useOptimisticFileUpload } from '@/entities/file/model/useOptimisticFileUpload';
import { addProjectScore } from '@/entities/score/api/addProjectScore';
import { removeScoreById } from '@/entities/score/api/removeScoreById';

export interface OptimisticEvidenceData {
  projectId?: number;
  evidenceId?: number;
  scoreId?: number;
  title: string;
  content: string;
  existingFileIds: number[];
  newFiles: File[];
  redirectPath?: string;
}

const handleEvidenceError = (error: unknown): string => {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status === HttpStatusCode.Forbidden) return '권한이 없습니다.';
    if (status === HttpStatusCode.NotFound) return '존재하지 않는 데이터입니다.';
    if (status === HttpStatusCode.Conflict) return '최대 제한 갯수에 도달했습니다.';
  }
  return '작업에 실패했습니다.';
};

export const useOptimisticEvidenceMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toastIdRef = useRef<string | number | undefined>(undefined);
  const fileUploadMutation = useOptimisticFileUpload();

  const createEvidence = useMutation({
    mutationFn: async (data: OptimisticEvidenceData) => {
      if (!data.projectId) throw new Error('프로젝트 ID가 필요합니다.');

      const uploadedFileIds = await fileUploadMutation.mutateAsync(data.newFiles);
      const fileIds = [...data.existingFileIds, ...uploadedFileIds];
      const scoreResponse = await addProjectScore({ projectId: data.projectId });

      try {
        await addEvidence({
          scoreId: scoreResponse.scoreId,
          title: data.title,
          content: data.content,
          fileIds,
        });
        await removeDraftEvidence();
      } catch (error) {
        await removeScoreById({ scoreId: scoreResponse.scoreId });
        throw error;
      }
    },
    onMutate: async (data) => {
      toastIdRef.current = toast.loading('프로젝트 참여글을 작성하는 중...');

      if (data.redirectPath) {
        router.push(data.redirectPath);
      }
    },
    onSuccess: () => {
      toast.success('프로젝트 참여글을 작성했습니다.', { id: toastIdRef.current });
      queryClient.invalidateQueries({ queryKey: ['evidence'] });
      queryClient.invalidateQueries({ queryKey: ['score'] });
    },
    onError: (error) => {
      toast.error(handleEvidenceError(error), { id: toastIdRef.current });
    },
  });

  const updateEvidence = useMutation({
    mutationFn: async (data: OptimisticEvidenceData) => {
      if (!data.evidenceId || !data.scoreId) throw new Error('증빙 ID와 점수 ID가 필요합니다.');

      const uploadedFileIds = await fileUploadMutation.mutateAsync(data.newFiles);
      const fileIds = [...data.existingFileIds, ...uploadedFileIds];

      await editEvidenceById({
        evidenceId: data.evidenceId,
        scoreId: data.scoreId,
        title: data.title,
        content: data.content,
        fileIds,
      });
    },
    onMutate: async (data) => {
      toastIdRef.current = toast.loading('수정하는 중...');

      if (data.redirectPath) {
        router.push(data.redirectPath);
      }
    },
    onSuccess: () => {
      toast.success('수정되었습니다.', { id: toastIdRef.current });
      queryClient.invalidateQueries({ queryKey: ['evidence'] });
    },
    onError: (error) => {
      toast.error(handleEvidenceError(error), { id: toastIdRef.current });
    },
  });

  const draftEvidence = useMutation({
    mutationFn: async (
      data: Pick<
        OptimisticEvidenceData,
        'title' | 'content' | 'existingFileIds' | 'newFiles' | 'redirectPath'
      >,
    ) => {
      const uploadedFileIds = await fileUploadMutation.mutateAsync(data.newFiles);
      const fileIds = [...data.existingFileIds, ...uploadedFileIds];

      await addDraftEvidence({
        title: data.title,
        content: data.content,
        fileIds,
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
      queryClient.invalidateQueries({ queryKey: ['evidence'] });
    },
    onError: (error) => {
      toast.error(handleEvidenceError(error), { id: toastIdRef.current });
    },
  });

  const deleteEvidence = useMutation({
    mutationFn: async (data: { scoreId?: number; evidenceId?: number; redirectPath?: string }) => {
      if (data.scoreId && data.evidenceId) {
        await removeScoreById({ scoreId: data.scoreId });
        await removeEvidence({ evidenceId: data.evidenceId });
      } else {
        await removeDraftEvidence();
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
      queryClient.invalidateQueries({ queryKey: ['evidence'] });
      queryClient.invalidateQueries({ queryKey: ['score'] });
    },
    onError: (error) => {
      toast.error(handleEvidenceError(error), { id: toastIdRef.current });
    },
  });

  return {
    createEvidence,
    updateEvidence,
    draftEvidence,
    deleteEvidence,
  };
};
