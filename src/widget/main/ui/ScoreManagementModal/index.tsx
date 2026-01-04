import { useEffect, useRef, useState } from 'react';

import { useGetCombinedScoresByCategory } from '@/entities/score/model/useGetCombinedScoresByCategory';
import { cn } from '@/shared/lib/cn';
import { useScoreDisplay } from '@/shared/provider/ScoreDisplayProvider';
import Button from '@/shared/ui/Button';
import ModalWrapper from '@/shared/ui/ModalWrapper';

import ScoreModal from '../ScoreModal';

interface ScoreManagementModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function ScoreManagementModal({ setIsModalOpen }: ScoreManagementModalProps) {
  const scoresByCategory = useGetCombinedScoresByCategory();
  const [modalMode, setModalMode] = useState<'list' | 'create' | 'edit'>('list');
  const [scoreId, setScoreId] = useState<number>(0);
  const [englishName, setEnglishName] = useState<string>('');
  const { mode } = useScoreDisplay();

  const scrollRef = useRef<HTMLElement>(null);
  const savedScrollPosition = useRef<number>(0);

  const saveScrollPosition = () => {
    if (scrollRef.current) {
      savedScrollPosition.current = scrollRef.current.scrollTop;
    }
  };

  const handleEditClick = (scoreId: number, englishName: string) => {
    saveScrollPosition();
    setModalMode('edit');
    setScoreId(scoreId);
    setEnglishName(englishName);
  };

  const handleAddClick = (englishName: string) => {
    saveScrollPosition();
    setModalMode('create');
    setEnglishName(englishName);
  };

  const handleCloseModal = (isOpen: boolean) => {
    if (!isOpen) {
      setModalMode('list');
    }
  };

  useEffect(() => {
    if (modalMode === 'list' && scrollRef.current) {
      scrollRef.current.scrollTop = savedScrollPosition.current;
    }
  }, [modalMode]);

  return (
    <div>
      {modalMode === 'edit' ? (
        <ScoreModal
          mode="edit"
          setIsModalOpen={handleCloseModal}
          categoryType={englishName}
          scoreId={scoreId}
        />
      ) : modalMode === 'create' ? (
        <ScoreModal mode="create" setIsModalOpen={handleCloseModal} categoryType={englishName} />
      ) : (
        <ModalWrapper
          className="h-[80%] w-full max-w-150 max-sm:max-w-100"
          onClose={() => setIsModalOpen(false)}
        >
          <div className="flex h-full flex-col justify-between gap-5 overflow-hidden">
            <h2 className="text-titleMedium text-center">내 점수 수정하기</h2>
            <section
              ref={scrollRef}
              className="flex flex-col items-start justify-start overflow-y-scroll"
            >
              {scoresByCategory?.map((category) => (
                <div key={category.categoryType} className="flex w-full flex-col">
                  <div className="flex justify-between bg-gray-50 px-5 py-2 text-sm font-bold text-gray-500">
                    <p>{category.categoryNames.koreanName}</p>
                    <p>
                      {mode === 'APPROVED'
                        ? `${category.approvedScore}점`
                        : mode === 'PENDING'
                          ? `${category.expectedScore}점`
                          : `${category.approvedScore}점 / ${category.expectedScore}점`}
                    </p>
                  </div>
                  {category.scores.map((score) => (
                    <article
                      key={score.scoreId}
                      className="flex w-full items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 last:border-none"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div
                          className={cn('h-2 w-2 shrink-0 rounded-full', {
                            'bg-main-500': score.scoreStatus === 'APPROVED',
                            'bg-gray-600': score.scoreStatus === 'PENDING',
                            'bg-error': score.scoreStatus === 'REJECTED',
                          })}
                        />
                        <p className="text-body2 overflow-hidden wrap-break-word">
                          {score.activityName || score.categoryNames.koreanName}
                        </p>
                      </div>
                      <Button
                        variant="border"
                        className="w-auto shrink-0 px-3 py-0.5"
                        onClick={() =>
                          handleEditClick(score.scoreId, score.categoryNames.englishName)
                        }
                      >
                        수정
                      </Button>
                    </article>
                  ))}
                  {!category.isMaxReached ? (
                    <button
                      className="flex w-full cursor-pointer items-center justify-center border-t border-gray-100 py-4 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
                      onClick={() => {
                        handleAddClick(category.categoryType);
                      }}
                    >
                      <span className="text-body2 font-medsium">점수 추가하기</span>
                    </button>
                  ) : null}
                </div>
              ))}
            </section>
            <Button variant="border" onClick={() => setIsModalOpen(false)}>
              뒤로가기
            </Button>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}
