import ProjectForm from '@/widget/project/ui/ProjectForm';

export default function ProjectView() {
  return (
    <div className="flex flex-col items-start w-full">
      <h1 className="text-main-700 text-titleMedium mb-9">프로젝트 참여</h1>
      <ProjectForm />
    </div>
  );
}
