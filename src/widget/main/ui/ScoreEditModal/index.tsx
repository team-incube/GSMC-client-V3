'use client';

import { useGetCategoryBySearch } from '@/entities/category/model/useGetCategoryBySearch';
import { useGetScoreById } from '@/entities/score/model/useGetScoreById';
import ScoreForm from '@/feature/score/ui';
import Button from '@/shared/ui/Button';
import ModalWrapper from '@/shared/ui/ModalWrapper';

interface ScoreEditModalProps {
  setIsEditModalOpen: (isOpen: boolean) => void;
  scoreId: number;
  categoryType: string;
}

export default function ScoreEditModal({ setIsEditModalOpen, scoreId, categoryType }: ScoreEditModalProps) {
  const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryBySearch({ keyword: categoryType });
  const { data: scoreData, isLoading: isScoreLoading } = useGetScoreById({ scoreId });
  const category = categoryData && categoryData.length >= 1 ? categoryData[0] : undefined;

  if (isCategoryLoading || isScoreLoading) {
    return (
      <ModalWrapper>
        <div className="flex h-[300px] w-[400px] items-center justify-center">
          <p>로딩 중...</p>
        </div>
      </ModalWrapper>
    );
  }

  if (!category || !scoreData) {
    return (
      <ModalWrapper>
        <div className="flex h-[300px] w-[400px] items-center justify-center">
          <p>점수 정보를 불러올 수 없습니다.</p>
        </div>
      </ModalWrapper>
    );
  }

  if (category.evidenceType === 'EVIDENCE') {
    return (
      <ModalWrapper>
        <div className="flex min-w-[400px] flex-col gap-4">
          <h2 className="mb-4 text-xl font-bold">{category.koreanName} 수정</h2>
          <p className="text-gray-600">
            프로젝트 관련 점수는 프로젝트에서 수정할 수 있습니다.<br />
            해당 점수는 이곳에서 수정할 수 없습니다.
          </p>
          <div className="mt-6 flex gap-2">
            <Button type="button" onClick={() => setIsEditModalOpen(false)}>
              확인
            </Button>
          </div>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper>
      <ScoreForm
        mode="edit"
        category={category}
        initialData={{
          scoreId: scoreData.scoreId,
          scoreValue: scoreData.scoreValue,
          activityName: scoreData.activityName,
          file: scoreData.file || undefined,
          scoreStatus: scoreData.scoreStatus,
          rejectionReason: scoreData.rejectionReason || undefined
        }}
        setIsModalOpen={setIsEditModalOpen}
      />
    </ModalWrapper>
  );
}
