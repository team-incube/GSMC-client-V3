'use client';

import { useState } from 'react';

import { useGetProjectBySearch } from '@/entities/project/model/useGetProjectBySearch';
import { useGetProjects } from '@/entities/project/model/useGetProjects';
import ProjectPost from '@/shared/ui/ProjectPost';
import SearchBar from '@/shared/ui/SearchBar';

export default function ProjectSection() {
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
}
