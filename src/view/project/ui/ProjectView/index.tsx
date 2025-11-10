import Header from '@/shared/ui/header/ui/Header';
import ProjectForm from '@/widget/project/ui/ProjectForm';

export default function ProjectView() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <section className="w-full max-w-[600px]">
        <h1 className="text-main-700 text-titleMedium">프로젝트 참여</h1>
        <ProjectForm />
      </section>
    </div>
  );
}
