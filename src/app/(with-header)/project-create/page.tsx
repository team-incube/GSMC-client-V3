"use client"

import { Suspense } from "react";

import ErrorBoundary from "@/shared/ui/ErrorBoundary";
import ProjectCreateView from "@/view/project-create/ui/ProjectCreateView";

export default function ProjectCreatePage() {
  return (
    <ErrorBoundary fallback={<ProjectCreateView.Error />}>
      <Suspense fallback={<ProjectCreateView.Loading />}>
        <ProjectCreateView />
      </Suspense>
    </ErrorBoundary>
  )
}
