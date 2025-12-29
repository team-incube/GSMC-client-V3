import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'sonner';

import { addScoreByCategoryType } from '@/entities/score/api/addScoreByCategoryType';
import { editScoreById } from '@/entities/score/api/editScoreById';
import { removeScoreById } from '@/entities/score/api/removeScoreById';

export interface ScoreMutationData {
  scoreId?: number;
  categoryType: string;
  value: string;
  fileId?: number;
}

const EDITABLE_CATEGORIES = ['external-activity', 'certificate', 'award'];

const handleScoreError = (error: unknown): string => {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status === HttpStatusCode.Forbidden) return '권한이 없습니다.';
    if (status === HttpStatusCode.NotFound) return '존재하지 않는 데이터입니다.';
    if (status === HttpStatusCode.BadRequest) return '잘못된 요청입니다.';
  }
  return '작업에 실패했습니다.';
};

export const useCreateScore = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ScoreMutationData) => {
      await addScoreByCategoryType({
        categoryType: data.categoryType,
        value: data.value,
        fileId: data.fileId,
      });
    },
    onSuccess: () => {
      toast.success('점수가 성공적으로 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['score'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(handleScoreError(error));
    },
  });
};

export const useUpdateScore = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ScoreMutationData) => {
      if (!data.scoreId) throw new Error('Score ID is required');

      if (EDITABLE_CATEGORIES.includes(data.categoryType)) {
        await editScoreById({
          categoryType: data.categoryType as 'external-activity' | 'certificate' | 'award',
          scoreId: data.scoreId,
          value: data.value,
          fileId: data.fileId,
        });
      } else {
        await addScoreByCategoryType({
          categoryType: data.categoryType,
          value: data.value,
          fileId: data.fileId,
        });
      }
    },
    onSuccess: () => {
      toast.success('수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['score'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(handleScoreError(error));
    },
  });
};

export const useDeleteScore = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (scoreId: number) => {
      await removeScoreById({ scoreId });
    },
    onSuccess: () => {
      toast.success('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['score'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(handleScoreError(error));
    },
  });
};
