import ProjectCreateForm from '@/feature/project-create/ui';
import { Suspense } from 'react';

export default function ProjectCreateView() {
  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col items-start">
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectCreateForm />
        </Suspense>
      </div>
    </div>
  );
}
