import { useCallback, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'sonner';

import { addDraftEvidence } from '@/entities/evidence/api/addDraftEvidence';
import { addEvidence } from '@/entities/evidence/api/addEvidence';
import { editEvidenceById } from '@/entities/evidence/api/editEvidenceById';
import { removeDraftEvidence } from '@/entities/evidence/api/removeDraftEvidence';
import { removeEvidence } from '@/entities/evidence/api/removeEvidence';
import { attachFile } from '@/entities/file/api/attachFile';
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

export const useOptimisticEvidenceMutation = () => {
  const queryClient = useQueryClient();
  const toastIdRef = useRef<string | number | undefined>(undefined);

  const uploadFiles = async (files: File[]): Promise<number[]> => {
    if (files.length === 0) return [];

    const uploadedFiles = await Promise.all(files.map((file) => attachFile({ file })));
    return uploadedFiles.map((f) => Number(f.id));
  };

  const createEvidence = useCallback(
    async (data: OptimisticEvidenceData, onSuccess: () => void) => {
      if (!data.projectId) {
        toast.error('프로젝트 ID가 필요합니다.');
        return;
      }

      // 즉시 페이지 이동 (낙관적 UX)
      onSuccess();

      // 로딩 토스트 표시
      toastIdRef.current = toast.loading('프로젝트 참여글을 작성하는 중...');

      try {
        // 1. 파일 업로드
        const uploadedFileIds = await uploadFiles(data.newFiles);
        const fileIds = [...data.existingFileIds, ...uploadedFileIds];

        // 2. 프로젝트 점수 생성
        const scoreResponse = await addProjectScore({ projectId: data.projectId });

        // 3. 증빙 생성
        try {
          await addEvidence({
            scoreId: scoreResponse.scoreId,
            title: data.title,
            content: data.content,
            fileIds,
          });
          await removeDraftEvidence();
        } catch (error) {
          // 실패 시 점수 롤백
          await removeScoreById({ scoreId: scoreResponse.scoreId });
          throw error;
        }

        // 4. 캐시 무효화 및 성공 토스트
        await queryClient.invalidateQueries({ queryKey: ['evidence'] });
        await queryClient.invalidateQueries({ queryKey: ['score'] });
        toast.success('프로젝트 참여글을 작성했습니다.', { id: toastIdRef.current });
      } catch (error) {
        toast.error(handleEvidenceError(error), { id: toastIdRef.current });
      }
    },
    [queryClient],
  );

  const updateEvidence = useCallback(
    async (data: OptimisticEvidenceData, onSuccess: () => void) => {
      if (!data.evidenceId || !data.scoreId) {
        toast.error('증빙 ID와 점수 ID가 필요합니다.');
        return;
      }

      // 즉시 페이지 이동 (낙관적 UX)
      onSuccess();

      // 로딩 토스트 표시
      toastIdRef.current = toast.loading('수정하는 중...');

      try {
        // 1. 파일 업로드
        const uploadedFileIds = await uploadFiles(data.newFiles);
        const fileIds = [...data.existingFileIds, ...uploadedFileIds];

        // 2. 증빙 수정
        await editEvidenceById({
          evidenceId: data.evidenceId,
          scoreId: data.scoreId,
          title: data.title,
          content: data.content,
          fileIds,
        });

        // 3. 캐시 무효화 및 성공 토스트
        await queryClient.invalidateQueries({ queryKey: ['evidence'] });
        toast.success('수정되었습니다.', { id: toastIdRef.current });
      } catch (error) {
        toast.error(handleEvidenceError(error), { id: toastIdRef.current });
      }
    },
    [queryClient],
  );

  const draftEvidence = useCallback(
    async (
      data: Pick<OptimisticEvidenceData, 'title' | 'content' | 'existingFileIds' | 'newFiles'>,
      onSuccess: () => void,
    ) => {
      // 즉시 페이지 이동 (낙관적 UX)
      onSuccess();

      // 로딩 토스트 표시
      toastIdRef.current = toast.loading('임시저장하는 중...');

      try {
        // 1. 파일 업로드
        const uploadedFileIds = await uploadFiles(data.newFiles);
        const fileIds = [...data.existingFileIds, ...uploadedFileIds];

        // 2. 임시저장
        await addDraftEvidence({
          title: data.title,
          content: data.content,
          fileIds,
        });

        // 3. 캐시 무효화 및 성공 토스트
        await queryClient.invalidateQueries({ queryKey: ['evidence'] });
        toast.success('임시저장되었습니다.', { id: toastIdRef.current });
      } catch (error) {
        toast.error(handleEvidenceError(error), { id: toastIdRef.current });
      }
    },
    [queryClient],
  );

  const deleteEvidence = useCallback(
    async (data: { scoreId?: number; evidenceId?: number }, onSuccess: () => void) => {
      // 즉시 페이지 이동 (낙관적 UX)
      onSuccess();

      // 로딩 토스트 표시
      toastIdRef.current = toast.loading('삭제하는 중...');

      try {
        if (data.scoreId && data.evidenceId) {
          await removeScoreById({ scoreId: data.scoreId });
          await removeEvidence({ evidenceId: data.evidenceId });
        } else {
          await removeDraftEvidence();
        }

        // 캐시 무효화 및 성공 토스트
        await queryClient.invalidateQueries({ queryKey: ['evidence'] });
        await queryClient.invalidateQueries({ queryKey: ['score'] });
        toast.success('삭제되었습니다.', { id: toastIdRef.current });
      } catch (error) {
        toast.error(handleEvidenceError(error), { id: toastIdRef.current });
      }
    },
    [queryClient],
  );

  return {
    createEvidence,
    updateEvidence,
    draftEvidence,
    deleteEvidence,
  };
};
