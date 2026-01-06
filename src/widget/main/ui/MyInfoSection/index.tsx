'use client';

import { useGetCombinedPercentScore } from '@/entities/score/model/useGetCombinedPercentScore';
import { useGetCombinedTotalScore } from '@/entities/score/model/useGetCombinedTotalScore';
import { useGetCurrentStudent } from '@/entities/student/model/useGetCurrentStudent';
import { useScoreDisplay } from '@/shared/provider/ScoreDisplayProvider';

const MyInfoSection = () => {
  const { mode } = useScoreDisplay();
  const { data: student } = useGetCurrentStudent();
  const totalScore = useGetCombinedTotalScore();
  const percentScore = useGetCombinedPercentScore({ includeApprovedOnly: mode === 'APPROVED' });

  return (
    <section className="flex w-full">
      <div className="flex w-full flex-col gap-4 font-semibold sm:gap-6 md:gap-[27px]">
        <div className="flex flex-wrap items-baseline justify-center gap-2 sm:gap-3">
          <p className="text-main-700 text-center text-2xl sm:text-3xl md:text-4xl">
            {student?.name ?? '사용자'}
          </p>
          <p className="text-lg text-black sm:text-xl md:text-2xl">님의</p>
          <p className="text-lg text-black sm:text-xl md:text-2xl">
            <span className="text-main-500">
              {mode === 'APPROVED' ? '실제' : mode === 'COMBINED' ? null : '예상'}
            </span>{' '}
            인증제 점수는
          </p>
        </div>
        <div className="flex flex-wrap items-baseline justify-center gap-2">
          <div className="flex items-center justify-center gap-2.5 rounded-full bg-[#f3f3f3] px-6 py-2 sm:px-8 sm:py-2.5 md:px-9 md:py-3">
            <p className="text-main-500 text-center text-3xl sm:text-4xl md:text-5xl">
              {mode === 'PENDING' ? totalScore.expected : totalScore.approved}점
            </p>
          </div>
          {mode === 'COMBINED' ? (
            <>
              <p className="text-center text-3xl text-black/40 sm:text-4xl md:text-5xl">/</p>
              <p className="text-center text-lg text-black/40 sm:text-xl">
                {totalScore.expected}점
              </p>
            </>
          ) : null}
        </div>
        <div className="flex flex-wrap items-baseline justify-center gap-2">
          <p className="text-main-500 rounded-xl bg-[#f3f3f3] px-2 py-1">
            학급 상위 {Math.floor(percentScore?.classPercentScore?.topPercentile ?? 0)}%
          </p>
          <p className="text-main-500 rounded-xl bg-[#f3f3f3] px-2 py-1">
            학년 상위 {Math.floor(percentScore?.gradePercentScore?.topPercentile ?? 0)}%
          </p>
        </div>
      </div>
    </section>
  );
};

const Loading = () => {
  return (
    <section className="flex w-full">
      <div className="flex w-full flex-col gap-4 font-semibold sm:gap-6 md:gap-[27px]">
        <div className="flex flex-wrap items-baseline justify-center gap-2 sm:gap-3">
          <p className="text-main-700 text-center text-2xl sm:text-3xl md:text-4xl">
            사용자
          </p>
          <p className="text-lg text-black sm:text-xl md:text-2xl">님의</p>
          <p className="text-lg text-black sm:text-xl md:text-2xl">
            인증제 점수는
          </p>
        </div>
        <div className="flex flex-wrap items-baseline justify-center gap-2">
          <div className="flex items-center justify-center gap-2.5 rounded-full bg-[#f3f3f3] px-6 py-2 sm:px-8 sm:py-2.5 md:px-9 md:py-3">
            <p className="text-main-500 text-center text-3xl sm:text-4xl md:text-5xl">
              N점
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-baseline justify-center gap-2">
          <p className="text-main-500 rounded-xl bg-[#f3f3f3] px-2 py-1">
            학급 상위 N
          </p>
          <p className="text-main-500 rounded-xl bg-[#f3f3f3] px-2 py-1">
            학년 상위 N
          </p>
        </div>
      </div>
    </section>
  );
};

const ErrorFallback = () => {
  return (
    <div className="h-40 w-full rounded-xl bg-red-50 p-4 text-red-500">
      점수 정보를 불러오는데 실패했습니다.
    </div>
  );
};

MyInfoSection.Loading = Loading;
MyInfoSection.Error = ErrorFallback;

export default MyInfoSection;
