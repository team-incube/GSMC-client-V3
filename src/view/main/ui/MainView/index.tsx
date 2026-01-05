import { Suspense } from 'react';

import ErrorBoundary from '@/shared/ui/ErrorBoundary';
import MyInfoSection from '@/widget/main/ui/MyInfoSection';
import MyScoreSection from '@/widget/main/ui/MyScoreSection';
import ProjectSection from '@/widget/main/ui/ProjectSection';

export default function MainView() {
  return (
    <div className="flex w-full justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-15.5">
      <div className="flex w-full max-w-[600px] flex-col">
        {/* 점수 헤더 섹션 */}
        <ErrorBoundary fallback={<div className="h-40 w-full rounded-xl bg-red-50 p-4 text-red-500">점수 정보를 불러오는데 실패했습니다.</div>}>
          <Suspense fallback={<div className="h-40 w-full animate-pulse rounded-xl bg-gray-200" />}>
            <MyInfoSection />
          </Suspense>
        </ErrorBoundary>

        {/* 내 점수 카드 섹션 */}
        <ErrorBoundary fallback={<div className="mt-12 h-60 w-full rounded-2xl bg-red-50 p-4 text-red-500">내 점수 정보를 불러오는데 실패했습니다.</div>}>
          <Suspense fallback={<div className="mt-12 h-60 w-full animate-pulse rounded-2xl bg-gray-200" />}>
            <MyScoreSection />
          </Suspense>
        </ErrorBoundary>

        {/* 프로젝트 검색 및 목록 섹션 */}
        <ErrorBoundary fallback={<div className="mt-6 h-40 w-full rounded-xl bg-red-50 p-4 text-red-500">프로젝트 목록을 불러오는데 실패했습니다.</div>}>
          <Suspense fallback={<div className="mt-6 h-40 w-full animate-pulse rounded-xl bg-gray-200" />}>
            <ProjectSection />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
