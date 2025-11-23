'use client';

import { useGetCategoryBySearch } from '@/shared/model/useGetCategoryBySearch';
import ModalWrapper from '@/shared/ui/ModalWrapper';

import ScoreAddForm from '../ScoreAddForm';

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
