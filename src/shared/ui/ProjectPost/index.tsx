import Image from "next/image";
import Link from "next/link";

import { ProjectType } from "@/entities/project/model/project";
import replace_logo from "@/shared/asset/img/replace_logo.png";

export default function ProjectPost({ priority = false, ...project }: ProjectType & { priority?: boolean }) {
  return (
    <article className="col-span-1 flex flex-col w-full sm:max-w-none h-fit rounded-[10px] border border-black/10 bg-white overflow-hidden">
      <Link href={`/project/${project.id}`}>
        <div className="relative w-full h-[120px] sm:h-[138px] overflow-hidden">
          <Image
            src={project.files?.[0]?.uri || replace_logo}
            alt="project_image"
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-start flex-1 px-3">
          <div className="flex flex-col justify-center items-start gap-1 py-2">
            <p className="text-sm sm:text-base font-semibold text-left text-black line-clamp-1">
              {project.title}
            </p>
            <p className="text-sm sm:text-base font-semibold text-left text-black/40 line-clamp-2">
              {project.description}
            </p>
            <p className="text-sm sm:text-base font-semibold text-left text-black/60 line-clamp-2">
              {`${project.participants.find(p => p.id === project.ownerId)?.name}${project.participants.length > 1 ? ` 외 ${project.participants.length - 1}` : ''}`}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}