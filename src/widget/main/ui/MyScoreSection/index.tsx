'use client';

import { Suspense, useState } from 'react';

import { useGetCombinedScoresByCategory } from '@/entities/score/model/useGetCombinedScoresByCategory';
import { useScoreDisplay } from '@/shared/provider/ScoreDisplayProvider';
import Button from '@/shared/ui/Button';
import ScoreManagementModal from '@/widget/main/ui/ScoreManagementModal';

const MyScoreSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mode } = useScoreDisplay();
  const scoresByCategory = useGetCombinedScoresByCategory();

  return (
    <section className="mt-8 sm:mt-12 md:mt-[3.63rem]">
      {isModalOpen ? (
        <Suspense fallback={<ScoreManagementModal.Loading setIsModalOpen={setIsModalOpen} />}>
          <ScoreManagementModal setIsModalOpen={setIsModalOpen} />
        </Suspense>
      ) : null}
      <div className="bg-main-100 w-full overflow-hidden rounded-2xl">
        <div className="bg-main-100 flex flex-col items-start justify-between gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-0 sm:px-8 sm:py-5 md:px-9 md:py-6">
          <h3 className="text-main-700 text-xl font-semibold sm:text-2xl">내 점수</h3>
          <Button
            variant="active"
            onClick={() => setIsModalOpen(true)}
            className="w-full px-[22px] py-[13px] text-center text-base font-semibold sm:w-auto sm:text-lg"
          >
            점수 수정
          </Button>
        </div>

        <div className="flex h-full rounded-xl px-4 sm:px-8 md:px-9">
          <div className="flex max-h-60 w-full flex-col items-start justify-start overflow-y-auto rounded-xl bg-white sm:max-h-80 md:max-h-100">
            {scoresByCategory?.map((category) => (
              <article
                key={category.categoryType}
                className="flex w-full items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6"
              >
                <p className="text-left text-base font-semibold text-gray-600 sm:text-center sm:text-lg">
                  {category.categoryNames.koreanName}
                </p>
                <p className="text-right text-base font-semibold whitespace-nowrap text-gray-600 sm:text-center sm:text-lg">
                  {mode === 'APPROVED'
                    ? `${category.approvedScore}점`
                    : mode === 'PENDING'
                      ? `${category.expectedScore}점`
                      : `${category.approvedScore}점 / ${category.expectedScore}점`}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Loading = () => {
  return (
    <section className="mt-8 sm:mt-12 md:mt-[3.63rem]">
      <div className="bg-main-100 w-full overflow-hidden rounded-2xl">
        <div className="bg-main-100 flex flex-col items-start justify-between gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-0 sm:px-8 sm:py-5 md:px-9 md:py-6">
          <h3 className="text-main-700 text-xl font-semibold sm:text-2xl">내 점수</h3>
          <Button
            variant="disabled"
            className="w-full px-[22px] py-[13px] cursor-not-allowed text-center text-base font-semibold sm:w-auto sm:text-lg"
          >
            점수 수정
          </Button>
        </div>

        <div className="flex h-full rounded-xl px-4 sm:px-8 md:px-9">
          <div className="flex max-h-60 w-full flex-col items-start justify-start overflow-y-auto rounded-xl bg-white sm:max-h-80 md:max-h-100">
            {[1, 2, 3, 4, 5].map((i) => (
              <article
                key={i}
                className="flex w-full items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6"
              >
                <p className="text-left text-base font-semibold text-gray-400 sm:text-center sm:text-lg">
                  카테고리 {i}
                </p>
                <p className="text-right text-base font-semibold whitespace-nowrap text-gray-400 sm:text-center sm:text-lg">
                  N점
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ErrorFallback = () => {
  return (
    <div className="mt-12 h-60 w-full rounded-2xl bg-red-50 p-4 text-red-500">
      내 점수 정보를 불러오는데 실패했습니다.
    </div>
  );
};

MyScoreSection.Loading = Loading;
MyScoreSection.Error = ErrorFallback;

export default MyScoreSection;
