import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { FileType } from '@/entities/file/model/file';
import { useOptimisticSingleFileUpload } from '@/entities/file/model/useOptimisticFileUpload';
import { addScoreByCategoryType } from '@/entities/score/api/addScoreByCategoryType';
import { editScoreById } from '@/entities/score/api/editScoreById';
import { removeScoreById } from '@/entities/score/api/removeScoreById';

export interface OptimisticScoreData {
  scoreId?: number;
  categoryType: string;
  value: string;
  files: {
    existing: FileType[];
    new: File[];
  };
  onSuccessCallback?: () => void;
}

const EDITABLE_CATEGORIES = ['external-activity', 'certificate', 'award'];

export const useOptimisticScoreMutation = () => {
  const queryClient = useQueryClient();
  const toastIdRef = useRef<string | number | undefined>(undefined);
  const fileUploadMutation = useOptimisticSingleFileUpload();

  const createScore = useMutation({
    mutationFn: async (data: OptimisticScoreData) => {
      let fileId: number | undefined;
      if (data.files.new.length > 0) {
        fileId = await fileUploadMutation.mutateAsync(data.files.new);
      } else if (data.files.existing.length > 0) {
        fileId = Number(data.files.existing[0].id);
      }

      await addScoreByCategoryType({
        categoryType: data.categoryType,
        value: data.value,
        fileId,
      });
    },
    onMutate: async (data) => {
      toastIdRef.current = toast.loading('점수를 추가하는 중...');

      if (data.onSuccessCallback) {
        data.onSuccessCallback();
      }
    },
    onSuccess: () => {
      toast.success('점수가 성공적으로 추가되었습니다.', { id: toastIdRef.current });
      queryClient.invalidateQueries({ queryKey: ['score'] });
    },
    onError: () => {
      toast.error('점수 추가에 실패했습니다. 다시 시도해주세요.', { id: toastIdRef.current });
    },
  });

  const updateScore = useMutation({
    mutationFn: async (data: OptimisticScoreData) => {
      if (!data.scoreId) throw new Error('점수 ID가 필요합니다.');

      let fileId: number | undefined;
      if (data.files.new.length > 0) {
        fileId = await fileUploadMutation.mutateAsync(data.files.new);
      } else if (data.files.existing.length > 0) {
        fileId = Number(data.files.existing[0].id);
      }

      if (EDITABLE_CATEGORIES.includes(data.categoryType)) {
        await editScoreById({
          categoryType: data.categoryType as 'external-activity' | 'certificate' | 'award',
          scoreId: data.scoreId,
          value: data.value,
          fileId,
        });
      } else {
        await addScoreByCategoryType({
          categoryType: data.categoryType,
          value: data.value,
          fileId,
        });
      }
    },
    onMutate: async (data) => {
      toastIdRef.current = toast.loading('점수를 수정하는 중...');

      if (data.onSuccessCallback) {
        data.onSuccessCallback();
      }
    },
    onSuccess: () => {
      toast.success('수정되었습니다.', { id: toastIdRef.current });
      queryClient.invalidateQueries({ queryKey: ['score'] });
    },
    onError: () => {
      toast.error('수정에 실패했습니다. 다시 시도해주세요.', { id: toastIdRef.current });
    },
  });

  const deleteScore = useMutation({
    mutationFn: async (data: { scoreId: number; onSuccessCallback?: () => void }) => {
      await removeScoreById({ scoreId: data.scoreId });
    },
    onMutate: async (data) => {
      toastIdRef.current = toast.loading('점수를 삭제하는 중...');

      if (data.onSuccessCallback) {
        data.onSuccessCallback();
      }
    },
    onSuccess: () => {
      toast.success('삭제되었습니다.', { id: toastIdRef.current });
      queryClient.invalidateQueries({ queryKey: ['score'] });
    },
    onError: () => {
      toast.error('삭제에 실패했습니다. 다시 시도해주세요.', { id: toastIdRef.current });
    },
  });

  return {
    createScore,
    updateScore,
    deleteScore,
  };
};
