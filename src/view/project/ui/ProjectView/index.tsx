import ProjectForm from '@/widget/project/ui/ProjectForm';

export default function ProjectView() {
  return (
    <div className="w-full flex flex-col items-center mt-9.5">
      <h1 className="text-main-700 text-titleMedium my-9">프로젝트 참여</h1>
      <ProjectForm />
    </div>
  );
}
