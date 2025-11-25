import ProjectCreateForm from '@/feature/project-create/ui';

export default function ProjectCreateView() {
  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col items-start">
        <ProjectCreateForm />
      </div>
    </div>
  );
}
