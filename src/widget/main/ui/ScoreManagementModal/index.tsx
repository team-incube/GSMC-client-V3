import { useState } from "react";

import { useGetCombinedScoresByCategory } from "@/entities/score/model/useGetCombinedScoresByCategory";
import { cn } from "@/shared/lib/cn";
import Button from "@/shared/ui/Button";
import ModalWrapper from "@/shared/ui/ModalWrapper";

import ScoreModal from "../ScoreModal";

interface ScoreManagementModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function ScoreManagementModal({ setIsModalOpen }: ScoreManagementModalProps) {
  const scoresByCategory = useGetCombinedScoresByCategory();
  const [modalMode, setModalMode] = useState<'list' | 'create' | 'edit'>('list');
  const [scoreId, setScoreId] = useState<number>(0);
  const [englishName, setEnglishName] = useState<string>('');

  const handleEditClick = (scoreId: number, englishName: string) => {
    setModalMode('edit');
    setScoreId(scoreId);
    setEnglishName(englishName);
  };

  const handleAddClick = (englishName: string) => {
    setModalMode('create');
    setEnglishName(englishName);
  };

  const handleCloseModal = (isOpen: boolean) => {
    if (!isOpen) {
      setModalMode('list');
    }
  };

  return (
    <div>
      {modalMode === 'edit' ? (
        <ScoreModal mode="edit" setIsModalOpen={handleCloseModal} categoryType={englishName} scoreId={scoreId} />
      ) : modalMode === 'create' ? (
        <ScoreModal mode="create" setIsModalOpen={handleCloseModal} categoryType={englishName} />
      ) : (
        <ModalWrapper onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col justify-center gap-10 w-150 overflow-hidden">
            <h2 className="text-titleMedium text-center">
              내 점수 수정하기
            </h2>
            <section className="flex flex-col justify-start items-start max-h-160 overflow-y-scroll">
              {scoresByCategory?.map((category) => (
                <div key={category.categoryType} className="w-full flex flex-col">
                  <div className="flex justify-between px-5 py-2 bg-gray-50 text-sm font-bold text-gray-500">
                    <p>{category.categoryNames.koreanName}</p>
                    <p>{category.approvedScore}점 / {category.expectedScore}점</p>
                  </div>
                  {category.scores.map((score) => (
                    <article key={score.scoreId} className="flex justify-between items-center w-full px-5 py-4 border-b border-gray-100 last:border-none">
                      <div className="flex items-center gap-[0.75rem]">
                        <div className={cn("w-2 h-2 aspect-square rounded-full", { "bg-main-500": score.scoreStatus === "APPROVED", "bg-gray-600": score.scoreStatus === "PENDING", "bg-error": score.scoreStatus === "REJECTED" })} />
                        <p className="text-body2"> {score.activityName || score.categoryNames.koreanName} </p>
                      </div>
                      <div className="flex items-center gap-[0.75rem]">
                        <Button
                          variant="border"
                          className="w-auto px-[0.75rem] py-[0.125rem]"
                          onClick={() => { handleEditClick(score.scoreId, score.categoryNames.englishName); }}
                        >
                          수정
                        </Button>
                      </div>
                    </article>
                  ))}
                  {!category.isMaxReached ? <button
                    className="w-full flex items-center justify-center py-4 text-gray-400 transition-colors border-t border-gray-100 cursor-pointer hover:text-gray-600 hover:bg-gray-50"
                    onClick={() => { handleAddClick(category.categoryType); }}
                  >
                    <span className="text-body2 font-medsium">
                      점수 추가하기
                    </span>
                  </button> : null}
                </div>
              ))}
            </section>
          </div>
          <Button variant="border" onClick={() => setIsModalOpen(false)}>
            뒤로가기
          </Button>
        </ModalWrapper>
      )}
    </div>
  );
}
