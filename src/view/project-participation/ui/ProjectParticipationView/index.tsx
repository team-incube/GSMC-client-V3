import ProjectParticipationForm from "@/feature/project-participation/ui";

export default function ProjectParticipationView() {
  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col items-start">
        <h1 className="text-main-700 text-titleMedium mb-9">프로젝트 참여</h1>
        <ProjectParticipationForm />
      </div>
    </div>
  );
}
