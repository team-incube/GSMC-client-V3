'use client';

import { useGetCategoryBySearch } from '@/entities/category/model/useGetCategoryBySearch';
import { useGetScoreById } from '@/entities/score/model/useGetScoreById';
import ScoreForm from '@/feature/score/ui';
import Button from '@/shared/ui/Button';
import ModalWrapper from '@/shared/ui/ModalWrapper';

interface ScoreModalProps {
  mode: 'create' | 'edit';
  setIsModalOpen: (isOpen: boolean) => void;
  categoryType: string;
  scoreId?: number;
}

export default function ScoreModal({ mode, setIsModalOpen, categoryType, scoreId }: ScoreModalProps) {
  const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryBySearch({ keyword: categoryType });
  const { data: scoreData, isLoading: isScoreLoading } = useGetScoreById(
    { scoreId: scoreId! },
    { enabled: mode === 'edit' && !!scoreId }
  );
  const category = categoryData && categoryData.length >= 1 ? categoryData[0] : undefined;

  const isLoading = isCategoryLoading || (mode === 'edit' && isScoreLoading);

  if (isLoading) {
    return (
      <ModalWrapper className='w-full max-sm:max-w-100 max-w-150'>
        <div className="flex w-full flex-col gap-6 p-2 animate-pulse">
          <div className="h-8 w-40 bg-gray-200 rounded" />
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-12 w-full bg-gray-100 rounded-lg border border-gray-100" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-12 w-full bg-gray-100 rounded-lg border border-gray-100" />
            </div>
          </div>
          <div className="h-12 w-full bg-gray-200 rounded mt-4" />
        </div>
      </ModalWrapper>
    );
  }

  if (!category || (mode === 'edit' && !scoreData)) {
    return (
      <ModalWrapper className='w-full max-sm:max-w-100 max-w-150'>
        <div className="flex h-[300px] w-full items-center justify-center">
          <p>{mode === 'edit' ? '점수 정보를 불러올 수 없습니다.' : '카테고리를 불러올 수 없습니다.'}</p>
        </div>
      </ModalWrapper>
    );
  }

  if (category.evidenceType === 'EVIDENCE') {
    return (
      <ModalWrapper className='w-full max-sm:max-w-100 max-w-150'>
        <div className="flex w-full flex-col gap-4">
          <h2 className="mb-4 text-xl font-bold">
            {category.koreanName} {mode === 'create' ? '추가' : '수정'}
          </h2>
          <p className="text-gray-600">
            {mode === 'create' ? (
              <>
                프로젝트 참여 점수는 메인 페이지의 프로젝트 목록에서<br />
                참여하기를 통해 추가할 수 있습니다.
              </>
            ) : (
              <>
                프로젝트 관련 점수는 프로젝트에서 수정할 수 있습니다.<br />
                해당 점수는 이곳에서 수정할 수 없습니다.
              </>
            )}
          </p>
          <div className="mt-6 flex gap-2">
            <Button type="button" onClick={() => setIsModalOpen(false)}>
              확인
            </Button>
          </div>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper className='w-full max-w-150 max-sm:max-w-100'>
      <ScoreForm
        mode={mode}
        category={category}
        initialData={
          mode === 'edit' && scoreData
            ? {
              scoreId: scoreData.scoreId,
              scoreValue: scoreData.scoreValue,
              activityName: scoreData.activityName,
              file: scoreData.file || undefined,
              scoreStatus: scoreData.scoreStatus,
              rejectionReason: scoreData.rejectionReason || undefined,
            }
            : undefined
        }
        setIsModalOpen={setIsModalOpen}
      />
    </ModalWrapper>
  );
}
