import { Suspense } from "react";

import ProjectParticipationView from "@/view/project-participation/ui/ProjectParticipationView";

export default function ProjectParticipationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectParticipationView />
    </Suspense>
  );
}
