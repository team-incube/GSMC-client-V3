import ProjectCreateForm from "@/widget/project-create/ui/ProjectCreateForm";

export default function ProjectCreateView() {
  return (
    <div className="flex flex-col items-start w-full">
      <h1 className="text-main-700 text-titleMedium mb-9">프로젝트 생성</h1>
      <ProjectCreateForm />
    </div>
  );
}
