import Image from "next/image";
import Link from "next/link";

import { ProjectType } from "@/entities/project/model/project";
import replace_logo from "@/shared/asset/img/replace_logo.png";

export default function ProjectPost({ ...project }: ProjectType) {
  return (
    <article className="flex flex-col w-[188px] h-fit rounded-[10px] border border-black/10 bg-white overflow-hidden">
      <Link href={`/project/${project.id}`}>
        <div className="w-full h-[138px] object-cover overflow-hidden" role="img">
          {!project.files[0].uri && <Image src={replace_logo} alt="project_image" width={300} height={138} />}
          <Image src={project.files[0].uri} alt="project_image" width={300} height={138} />
        </div>

        <div className="flex flex-col items-start flex-1 px-3">
          <div className="flex flex-col justify-center items-start gap-1 py-2">
            <p className="text-base font-semibold text-left text-black">
              {project.title}
            </p>
            <p className="text-base font-semibold text-left text-black/40 line-clamp-2">
              {project.description}
            </p>
            <p className="text-base font-semibold text-left text-black/60 line-clamp-2">
              {project.participants.some((participant) => participant.id === project.ownerId)
                ? project.participants.find((participant) => participant.id === project.ownerId)?.name
                : ""} 외 {project.participants.length - 1}명
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
