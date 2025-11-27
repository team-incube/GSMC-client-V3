import Link from "next/link";

import { ProjectType } from "@/entities/project/model/project";

export default function ProjectPost({ ...project }: ProjectType) {
  return (
    <article className="flex flex-col w-[188px] h-[276px] rounded-[10px] bg-white overflow-hidden">
      <Link href={`/project/${project.id}`}>
        <div className="w-full h-[138px] bg-gray-400" role="img" aria-label="Post image placeholder" />

        <div className="flex flex-col items-start flex-1 px-3">
          <div className="flex justify-center items-center py-2">
            <p className="text-base font-semibold text-left text-black">
              {project.title}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
