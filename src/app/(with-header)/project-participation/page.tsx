"use client"

import { Suspense } from "react";

import ErrorBoundary from "@/shared/ui/ErrorBoundary";
import ProjectParticipationView from "@/view/project-participation/ui/ProjectParticipationView";

export default function ProjectParticipationPage() {
  return (
    <ErrorBoundary fallback={<ProjectParticipationView.Error />}>
      <Suspense fallback={<ProjectParticipationView.Loading />}>
        <ProjectParticipationView />
      </Suspense>
    </ErrorBoundary>
  );
}
