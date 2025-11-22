"use client"

import { useState } from "react";

import { useGetProjectBySearch } from "@/entities/project/model/useGetProjectBySearch";
import { useGetProjects } from "@/entities/project/model/useGetProjects";
import { useGetcoresByCategory } from "@/entities/score/model/useGetScoresByCategory";
import { useGetTotalScore } from "@/entities/score/model/useGetTotalScore";
import { useGetCurrentStudent } from "@/entities/student/model/useGetCurrentStudent";
import Button from "@/shared/ui/Button";
import ProjectPost from "@/shared/ui/ProjectPost";
import SearchBar from "@/shared/ui/SearchBar";
import ScorePatchModal from "@/widget/main/ui/ScorePatchModal";

export default function MainView() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data: student } = useGetCurrentStudent();
  const { data: score } = useGetTotalScore();
  const { data: scoresByCategory } = useGetcoresByCategory({});
  const { data: allProjects } = useGetProjects();
  const { data: searchedProjects } = useGetProjectBySearch({ title: searchKeyword, page: 0, size: 10 });
  const projects = searchKeyword ? searchedProjects : allProjects;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <ScorePatchModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <section className="flex justify-start w-full">
        <div className="flex flex-col font-semibold w-72 h-[145px] gap-[27px]">
          <div className="flex items-baseline gap-3">
            <p className="text-4xl text-center text-main-700">{student?.name}</p>
            <p className="text-2xl text-left text-black">님의 인증제 점수는</p>
          </div>
          <div className="flex items-baseline gap-4.5">
            <div className="flex justify-center items-center gap-2.5 px-9 py-3 rounded-full bg-[#f3f3f3]">
              <p className="flex-grow-0 flex-shrink-0 text-5xl text-center text-main-500">{score?.totalScore}점</p>
            </div>
            <p className="text-2xl text-black">입니다.</p>
          </div>
        </div>
      </section>

      <section className="mt-[3.63rem]">
        <div className="w-full rounded-2xl bg-main-100 overflow-hidden">

          <div className="flex justify-between items-center py-[1.5rem] bg-main-100 px-[2.25rem]">
            <h3 className="text-2xl font-semibold text-main-700">내 점수</h3>
            <Button
              variant="active"
              onClick={() => setIsModalOpen(true)}
              className="w-auto px-[22px] py-[13px] text-lg font-semibold text-center"
            >
              점수 수정
            </Button>
          </div>

          <div className="flex h-full rounded-xl px-[2.25rem]">
            <div className="flex flex-col justify-start items-start w-full max-h-100 overflow-y-auto rounded-xl bg-white">
              {scoresByCategory?.map((category) => (
                <article key={category.categoryType} className="flex justify-between items-center w-full px-8 py-6">
                  <p className="text-lg font-semibold text-center text-[#68696c]">{category.categoryNames.koreanName}</p>
                  <p className="text-lg font-semibold text-center text-[#68696c]">{category.recognizedScore}점</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-6">
        <SearchBar
          placeholder="찾는 내 프로젝트를 입력해주세요."
          onSearchChange={setSearchKeyword}
        />
        <div className="flex flex-wrap gap-4">
          {projects?.map((project) => (
            <ProjectPost
              key={project.id}
              {...project}
            />
          ))}
        </div>

      </section>

    </div>
  )
}
