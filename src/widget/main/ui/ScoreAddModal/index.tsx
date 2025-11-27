'use client';

import { useGetCategoryBySearch } from '@/entities/category/model/useGetCategoryBySearch';
import ScoreAddForm from '@/feature/score-add/ui';
import Button from '@/shared/ui/Button';
import ModalWrapper from '@/shared/ui/ModalWrapper';

interface ScoreAddModalProps {
  setIsAddModalOpen: (isOpen: boolean) => void;
  categoryType: string;
}

export default function ScoreAddModal({ setIsAddModalOpen, categoryType }: ScoreAddModalProps) {
  const { data: categoryData, isLoading } = useGetCategoryBySearch({ keyword: categoryType });
  const category = categoryData && categoryData.length >= 1 ? categoryData[0] : undefined;

  if (isLoading) {
    return (
      <ModalWrapper>
        <div className="flex h-[300px] w-[400px] items-center justify-center">
          <p>로딩 중...</p>
        </div>
      </ModalWrapper>
    );
  }

  if (!category) {
    return (
      <ModalWrapper>
        <div className="flex h-[300px] w-[400px] items-center justify-center">
          <p>카테고리를 불러올 수 없습니다.</p>
        </div>
      </ModalWrapper>
    );
  }

  if (category.evidenceType === 'EVIDENCE') {
    return (
      <ModalWrapper>
        <div className="flex min-w-[400px] flex-col gap-4">
          <h2 className="mb-4 text-xl font-bold">{category.koreanName} 추가</h2>
          <p className="text-gray-600">
            프로젝트 참여 점수는 메인 페이지의 프로젝트 목록에서<br />
            참여하기를 통해 추가할 수 있습니다.
          </p>
          <div className="mt-6 flex gap-2">
            <Button type="button" onClick={() => setIsAddModalOpen(false)}>
              확인
            </Button>
          </div>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper>
      <ScoreAddForm
        category={category}
        setIsAddModalOpen={setIsAddModalOpen}
      />
    </ModalWrapper>
  );
}
