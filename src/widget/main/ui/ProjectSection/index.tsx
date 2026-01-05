'use client';

import { useState } from 'react';

import { useGetProjectBySearch } from '@/entities/project/model/useGetProjectBySearch';
import { useGetProjects } from '@/entities/project/model/useGetProjects';
import ProjectPost from '@/shared/ui/ProjectPost';
import SearchBar from '@/shared/ui/SearchBar';

const ProjectSection = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const { data: allProjects } = useGetProjects();
  const { data: searchedProjects } = useGetProjectBySearch({
    title: searchKeyword,
    page: 0,
    size: 10,
  });
  const projects = searchKeyword ? searchedProjects : allProjects;

  return (
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
  );
};

const Loading = () => {
  return (
    <section className="mt-6 flex flex-col gap-4 sm:gap-6">
      <SearchBar
        placeholder="찾는 내 프로젝트를 입력해주세요."
        onSearchChange={() => { }}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-xl bg-gray-200" />
        ))}
      </div>
    </section>
  );
};

const ErrorFallback = () => {
  return (
    <div className="mt-6 h-40 w-full rounded-xl bg-red-50 p-4 text-red-500">
      프로젝트 목록을 불러오는데 실패했습니다.
    </div>
  );
};

ProjectSection.Loading = Loading;
ProjectSection.Error = ErrorFallback;

export default ProjectSection;
