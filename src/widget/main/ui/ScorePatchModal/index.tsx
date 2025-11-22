import { useGetcoresByCategory } from "@/entities/score/model/useGetScoresByCategory";
import { cn } from "@/shared/lib/cn";
import Button from "@/shared/ui/Button";
import ModalWrapper from "@/shared/ui/ModalWrapper";

interface ScorePatchModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function ScorePatchModal({ isModalOpen = false, setIsModalOpen }: ScorePatchModalProps) {
  const { data: scoresByCategory } = useGetcoresByCategory({});

  return (
    <div>
      {isModalOpen ? <ModalWrapper>
        <div className="flex flex-col justify-center gap-10 w-150 overflow-hidden">
          <h2 className="text-titleMedium text-center">
            내 점수 수정하기
          </h2>
          <section className="flex flex-col justify-start items-start max-h-160 overflow-y-scroll">
            {scoresByCategory?.map((category) => (
              <div key={category.categoryType} className="w-full flex flex-col">
                <div className="flex justify-between px-5 py-2 bg-gray-50 text-sm font-bold text-gray-500">
                  <p>{category.categoryNames.koreanName}</p>
                  <p>{category.recognizedScore}점</p>
                </div>
                {category.scores.map((score) => (
                  <article
                    key={score.scoreId}
                    className="flex justify-between items-center w-full px-5 py-4 border-b border-gray-100 last:border-none"
                  >
                    <div className="flex items-center gap-[0.75rem]">
                      <div className={cn("w-2 h-2 aspect-square rounded-full", {
                        "bg-main-500": score.scoreStatus === "APPROVED",
                        "bg-gray-600": score.scoreStatus === "REJECTED",
                        "bg-error": score.scoreStatus === "PENDING",
                      })} />
                      <p className="text-body2">
                        {score.activityName}
                      </p>
                    </div>
                    <div className="flex items-center gap-[0.75rem]">
                      <Button variant="border" className="w-auto px-[0.75rem] py-[0.125rem]">
                        수정
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </section>
        </div>
        <Button variant="border" onClick={() => setIsModalOpen(false)}>
          뒤로가기
        </Button>
      </ModalWrapper> : null
      }
    </div>

  )
}
