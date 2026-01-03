'use client';

import { useState } from 'react';

import { useGetProjectBySearch } from '@/entities/project/model/useGetProjectBySearch';
import { useGetProjects } from '@/entities/project/model/useGetProjects';
import { useGetCombinedScoresByCategory } from '@/entities/score/model/useGetCombinedScoresByCategory';
import { useGetCombinedTotalScore } from '@/entities/score/model/useGetCombinedTotalScore';
import { useGetPercentScore } from '@/entities/score/model/useGetPercentScore';
import { useGetCurrentStudent } from '@/entities/student/model/useGetCurrentStudent';
import Button from '@/shared/ui/Button';
import ProjectPost from '@/shared/ui/ProjectPost';
import SearchBar from '@/shared/ui/SearchBar';
import ScoreManagementModal from '@/widget/main/ui/ScoreManagementModal';

export default function MainView() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: student } = useGetCurrentStudent();
  const totalScore = useGetCombinedTotalScore();
  const scoresByCategory = useGetCombinedScoresByCategory();
  const { data: classPercentScore } = useGetPercentScore({
    type: 'class',
    includeApprovedOnly: true,
  });
  const { data: gradePercentScore } = useGetPercentScore({
    type: 'grade',
    includeApprovedOnly: true,
  });
  const { data: allProjects } = useGetProjects();
  const { data: searchedProjects } = useGetProjectBySearch({
    title: searchKeyword,
    page: 0,
    size: 10,
  });
  const projects = searchKeyword ? searchedProjects : allProjects;

  return (
    <div className="flex w-full justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-15.5">
      <div className="flex w-full max-w-[600px] flex-col">
        {isModalOpen ? <ScoreManagementModal setIsModalOpen={setIsModalOpen} /> : null}

        {/* 점수 헤더 섹션 */}
        <section className="flex w-full">
          <div className="flex w-full flex-col gap-4 font-semibold sm:gap-6 md:gap-[27px]">
            <div className="flex flex-wrap items-baseline justify-center gap-2 sm:gap-3">
              <p className="text-main-700 text-center text-2xl sm:text-3xl md:text-4xl">
                {student?.name ?? '사용자'}
              </p>
              <p className="text-left text-lg text-black sm:text-xl md:text-2xl">
                님의 인증제 점수는
              </p>
            </div>
            <div className="flex flex-wrap items-baseline justify-center gap-2">
              <div className="flex items-center justify-center gap-2.5 rounded-full bg-[#f3f3f3] px-6 py-2 sm:px-8 sm:py-2.5 md:px-9 md:py-3">
                <p className="text-main-500 text-center text-3xl sm:text-4xl md:text-5xl">
                  {totalScore.approved ?? 0}점
                </p>
              </div>
              <p className="text-center text-3xl text-black/40 sm:text-4xl md:text-5xl">/</p>
              <p className="text-center text-lg text-black/40 sm:text-xl">
                {totalScore.expected ?? 0}점
              </p>
            </div>
            <div className="flex flex-wrap items-baseline justify-center gap-2">
              <p className="text-main-500 rounded-xl bg-[#f3f3f3] px-2 py-1">
                학급 상위 {Math.floor(classPercentScore?.topPercentile ?? 0)}%
              </p>
              <p className="text-main-500 rounded-xl bg-[#f3f3f3] px-2 py-1">
                학년 상위 {Math.floor(gradePercentScore?.topPercentile ?? 0)}%
              </p>
            </div>
          </div>
        </section>

        {/* 내 점수 카드 섹션 */}
        <section className="mt-8 sm:mt-12 md:mt-[3.63rem]">
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
                      {category.approvedScore}점 / {category.expectedScore}점
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 프로젝트 검색 및 목록 섹션 */}
        <section className="mt-6 flex flex-col gap-4 sm:gap-6">
          <SearchBar
            placeholder="찾는 내 프로젝트를 입력해주세요."
            onSearchChange={setSearchKeyword}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {projects?.map((project) => (
              <ProjectPost key={project.id} {...project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
