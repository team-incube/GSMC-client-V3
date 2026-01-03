'use client';

import { useState } from 'react';

import { useGetProjectBySearch } from '@/entities/project/model/useGetProjectBySearch';
import { useGetProjects } from '@/entities/project/model/useGetProjects';
import { useGetCombinedScoresByCategory } from '@/entities/score/model/useGetCombinedScoresByCategory';
import { useGetCombinedTotalScore } from '@/entities/score/model/useGetCombinedTotalScore';
import { useGetCurrentStudent } from '@/entities/student/model/useGetCurrentStudent';
import Button from '@/shared/ui/Button';
import ProjectPost from '@/shared/ui/ProjectPost';
import SearchBar from '@/shared/ui/SearchBar';
import ScoreManagementModal from '@/widget/main/ui/ScoreManagementModal';
import { useGetPercentScore } from '@/entities/score/model/useGetPercentScore';

export default function MainView() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: student } = useGetCurrentStudent();
  const totalScore = useGetCombinedTotalScore();
  const scoresByCategory = useGetCombinedScoresByCategory();
  const { data: classPercentScore } = useGetPercentScore({ type: "class" });
  const { data: gradePercentScore } = useGetPercentScore({ type: "grade" });
  const { data: allProjects } = useGetProjects();
  const { data: searchedProjects } = useGetProjectBySearch({
    title: searchKeyword,
    page: 0,
    size: 10,
  });
  const projects = searchKeyword ? searchedProjects : allProjects;

  return (
    <div className="flex w-full justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-15.5">
      <div className="flex w-full max-w-[600px] flex-col">
        {isModalOpen ? <ScoreManagementModal setIsModalOpen={setIsModalOpen} /> : null}

        {/* 점수 헤더 섹션 */}
        <section className="flex w-full">
          <div className="flex w-full flex-col gap-4 sm:gap-6 md:gap-[27px] font-semibold">
            <div className="flex flex-wrap justify-center items-baseline gap-2 sm:gap-3">
              <p className="text-main-700 text-center text-2xl sm:text-3xl md:text-4xl">{student?.name ?? "사용자"}</p>
              <p className="text-left text-lg sm:text-xl md:text-2xl text-black">님의 인증제 점수는</p>
            </div>
            <div className="flex flex-wrap justify-center items-baseline gap-2">
              <div className="flex items-center justify-center gap-2.5 rounded-full bg-[#f3f3f3] px-6 sm:px-8 md:px-9 py-2 sm:py-2.5 md:py-3">
                <p className="text-main-500 text-center text-3xl sm:text-4xl md:text-5xl">
                  {totalScore.approved ?? 0}점
                </p>
              </div>
              <p className="text-black/40 text-center text-3xl sm:text-4xl md:text-5xl">
                /
              </p>
              <p className="text-black/40 text-center text-lg sm:text-xl">
                {totalScore.expected ?? 0}점
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-baseline gap-2">
              <p className='bg-[#f3f3f3] text-main-500 px-2 py-1 rounded-xl'>학급 상위 {Math.floor(classPercentScore?.topPercentile ?? 0)}%</p>
              <p className='bg-[#f3f3f3] text-main-500 px-2 py-1 rounded-xl'>학년 상위 {Math.floor(gradePercentScore?.topPercentile ?? 0)}%</p>
            </div>
          </div>
        </section>

        {/* 내 점수 카드 섹션 */}
        <section className="mt-8 sm:mt-12 md:mt-[3.63rem]">
          <div className="bg-main-100 w-full overflow-hidden rounded-2xl">
            <div className="bg-main-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 px-4 sm:px-8 md:px-9 py-4 sm:py-5 md:py-6">
              <h3 className="text-main-700 text-xl sm:text-2xl font-semibold">내 점수</h3>
              <Button
                variant="active"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-[22px] py-[13px] text-center text-base sm:text-lg font-semibold"
              >
                점수 수정
              </Button>
            </div>

            <div className="flex h-full rounded-xl px-4 sm:px-8 md:px-9">
              <div className="flex max-h-60 sm:max-h-80 md:max-h-100 w-full flex-col items-start justify-start overflow-y-auto rounded-xl bg-white">
                {scoresByCategory?.map((category) => (
                  <article
                    key={category.categoryType}
                    className="flex w-full items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6"
                  >
                    <p className="text-left sm:text-center text-base sm:text-lg font-semibold text-gray-600">
                      {category.categoryNames.koreanName}
                    </p>
                    <p className="text-right sm:text-center text-base sm:text-lg font-semibold text-gray-600 whitespace-nowrap">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {projects?.map((project) => (
              <ProjectPost key={project.id} {...project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}