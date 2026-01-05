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
        <ErrorBoundary fallback={<MyInfoSection.Error />}>
          <Suspense fallback={<MyInfoSection.Loading />}>
            <MyInfoSection />
          </Suspense>
        </ErrorBoundary>

        {/* 내 점수 카드 섹션 */}
        <ErrorBoundary fallback={<MyScoreSection.Error />}>
          <Suspense fallback={<MyScoreSection.Loading />}>
            <MyScoreSection />
          </Suspense>
        </ErrorBoundary>

        {/* 프로젝트 검색 및 목록 섹션 */}
        <ErrorBoundary fallback={<ProjectSection.Error />}>
          <Suspense fallback={<ProjectSection.Loading />}>
            <ProjectSection />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
