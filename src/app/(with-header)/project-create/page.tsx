import { Suspense } from "react";

import ProjectCreateView from "@/view/project-create/ui/ProjectCreateView";

export default function ProjectCreatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectCreateView />
    </Suspense>
  )
}
