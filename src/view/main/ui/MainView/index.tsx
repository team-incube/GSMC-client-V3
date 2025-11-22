"use client"

import { useState } from "react";

import { useGetProjectBySearch } from "@/entities/project/model/useGetProjectBySearch";
import { useGetProjects } from "@/entities/project/model/useGetProjects";
import { useGetcoresByCategory } from "@/entities/score/model/useGetScoresByCategory";
import { useGetTotalScore } from "@/entities/score/model/useGetTotalScore";
import { useGetCurrentStudent } from "@/entities/student/model/useGetCurrentStudent";
import { cn } from "@/shared/lib/cn";
import Button from "@/shared/ui/Button";
import ModalWrapper from "@/shared/ui/ModalWrapper";
import ProjectPost from "@/shared/ui/ProjectPost";
import SearchBar from "@/shared/ui/SearchBar";

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
        <div className="w-full h-[445px] relative overflow-hidden rounded-[20px] bg-[#dfeafe]">

          <div className="flex justify-between items-center py-[1.5rem] bg-[#dfeafe] px-[2.25rem]">
            <p className="text-2xl font-semibold text-[#385b97]">내 점수</p>
            <Button variant="active" onClick={() => setIsModalOpen(true)} className="w-auto px-[22px] py-[13px] text-lg font-semibold text-center">
              점수 수정
            </Button>
          </div>

          <div className="flex flex-col justify-start items-start h-full overflow-y-scroll rounded-xl px-[2.25rem]">
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-full bg-white rounded-xl">
              {scoresByCategory?.map((category) => (
                <article key={category.categoryType} className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 px-8 py-6">
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
