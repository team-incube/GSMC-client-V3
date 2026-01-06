"use client"

import { Suspense } from "react";

import ErrorBoundary from "@/shared/ui/ErrorBoundary";
import ProjectView from "@/view/project/ui/ProjectView";

export default function ProjectPage() {
  return (
    <ErrorBoundary fallback={<ProjectView.Error />}>
      <Suspense fallback={<ProjectView.Loading />}>
        <ProjectView />
      </Suspense>
    </ErrorBoundary>
  )
}
