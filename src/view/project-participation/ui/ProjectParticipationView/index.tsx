import ProjectParticipationForm from "@/widget/project-participation/ui/ProjectParticipationForm";

export default function ProjectParticipationView() {
  return (
    <div className="flex flex-col items-start w-full">
      <h1 className="text-main-700 text-titleMedium mb-9">프로젝트 참여</h1>
      <ProjectParticipationForm />
    </div>
  );
}
