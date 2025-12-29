import { useCallback, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';
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
}

const EDITABLE_CATEGORIES = ['external-activity', 'certificate', 'award'];

export const useOptimisticScoreMutation = () => {
  const queryClient = useQueryClient();
  const toastIdRef = useRef<string | number | undefined>(undefined);

  const { mutateAsync: uploadFile } = useOptimisticSingleFileUpload({ toastIdRef });

  const createScore = useCallback(
    async (data: OptimisticScoreData, onClose: () => void) => {
      // 즉시 모달 닫기 (낙관적 UX)
      onClose();

      // 로딩 토스트 표시
      toastIdRef.current = toast.loading('점수를 추가하는 중...');

      try {
        // 1. 파일 업로드 (있는 경우)
        let fileId: number | undefined;

        if (data.files.new.length > 0) {
          fileId = await uploadFile(data.files.new);
        } else if (data.files.existing.length > 0) {
          fileId = Number(data.files.existing[0].id);
        }

        // 2. 점수 생성
        await addScoreByCategoryType({
          categoryType: data.categoryType,
          value: data.value,
          fileId,
        });

        // 3. 캐시 무효화 및 성공 토스트
        await queryClient.invalidateQueries({ queryKey: ['score'] });
        toast.success('점수가 성공적으로 추가되었습니다.', { id: toastIdRef.current });
      } catch {
        toast.error('점수 추가에 실패했습니다. 다시 시도해주세요.', { id: toastIdRef.current });
      }
    },
    [queryClient, uploadFile],
  );

  const updateScore = useCallback(
    async (data: OptimisticScoreData, onClose: () => void) => {
      if (!data.scoreId) {
        toast.error('점수 ID가 필요합니다.');
        return;
      }

      // 즉시 모달 닫기 (낙관적 UX)
      onClose();

      // 로딩 토스트 표시
      toastIdRef.current = toast.loading('점수를 수정하는 중...');

      try {
        // 1. 파일 업로드 (있는 경우)
        let fileId: number | undefined;

        if (data.files.new.length > 0) {
          fileId = await uploadFile(data.files.new);
        } else if (data.files.existing.length > 0) {
          fileId = Number(data.files.existing[0].id);
        }

        // 2. 점수 수정
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

        // 3. 캐시 무효화 및 성공 토스트
        await queryClient.invalidateQueries({ queryKey: ['score'] });
        toast.success('수정되었습니다.', { id: toastIdRef.current });
      } catch {
        toast.error('수정에 실패했습니다. 다시 시도해주세요.', { id: toastIdRef.current });
      }
    },
    [queryClient, uploadFile],
  );

  const deleteScore = useCallback(
    async (scoreId: number, onClose: () => void) => {
      // 즉시 모달 닫기 (낙관적 UX)
      onClose();

      // 로딩 토스트 표시
      toastIdRef.current = toast.loading('점수를 삭제하는 중...');

      try {
        await removeScoreById({ scoreId });

        // 캐시 무효화 및 성공 토스트
        await queryClient.invalidateQueries({ queryKey: ['score'] });
        toast.success('삭제되었습니다.', { id: toastIdRef.current });
      } catch {
        toast.error('삭제에 실패했습니다. 다시 시도해주세요.', { id: toastIdRef.current });
      }
    },
    [queryClient],
  );

  return {
    createScore,
    updateScore,
    deleteScore,
  };
};
