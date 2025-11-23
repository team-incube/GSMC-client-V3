'use client';

import { useGetCategoryBySearch } from '@/entities/category/model/useGetCategoryBySearch';
import ScoreAddForm from '@/feature/score-add/ui';
import ModalWrapper from '@/shared/ui/ModalWrapper';

interface ScoreAddModalProps {
  setIsAddModalOpen: (isOpen: boolean) => void;
  categoryType: string;
}

export default function ScoreAddModal({ setIsAddModalOpen, categoryType }: ScoreAddModalProps) {
  const { data: categoryData } = useGetCategoryBySearch({ keyword: categoryType });

  const category = categoryData?.[0];

  if (!category) {
    return (
      <ModalWrapper>
        <div className="flex h-[300px] w-[400px] items-center justify-center">
          <p>로딩 중...</p>
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
