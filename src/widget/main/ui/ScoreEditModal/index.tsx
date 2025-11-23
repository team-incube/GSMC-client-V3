'use client';

import { useGetCategoryBySearch } from '@/entities/category/model/useGetCategoryBySearch';
import { useGetEvidenceById } from '@/entities/evidence/model/useGetEvidenceById';
import { useGetScoreById } from '@/entities/score/model/useGetScoreById';
import EvidenceEditForm from '@/feature/evidence-edit/ui';
import ScoreEditForm from '@/feature/score-edit/ui';
import ModalWrapper from '@/shared/ui/ModalWrapper';

interface ScoreEditModalProps {
  setIsEditModalOpen: (isOpen: boolean) => void;
  scoreId: number;
  englishName: string;
}

export default function ScoreEditModal({ setIsEditModalOpen, scoreId, englishName }: ScoreEditModalProps) {
  const { data: categoryData } = useGetCategoryBySearch({ keyword: englishName });

  const category = categoryData?.[0];

  const { data: scoreData } = useGetScoreById({ scoreId });

  const evidenceId = Number(scoreData?.evidence?.evidenceId);

  const { data: evidenceData } = useGetEvidenceById({ evidenceId });

  if (!category || !scoreData || (category.evidenceType === 'EVIDENCE' && !evidenceData)) {
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
      {category.evidenceType === 'EVIDENCE' && evidenceData ? (
        <EvidenceEditForm
          evidenceData={evidenceData}
          setIsEditModalOpen={setIsEditModalOpen}
          categoryName={category.koreanName}
        />
      ) : (
        <ScoreEditForm
          scoreData={scoreData}
          category={category}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}
    </ModalWrapper>
  );
}
