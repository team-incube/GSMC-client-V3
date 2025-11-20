'use client';

import { useGetProjectById } from '@/entities/project/model/useGetProjectById';
import { handleProjectParticipation } from '@/feature/project-participation/lib/handleProjectParticipation';
import { ParticipationProjectFormState } from '@/feature/project-participation/model/ParticipationProjectForm';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
import FileUploader from '@/shared/ui/FileUploader';
import Input from '@/shared/ui/Input';
import Textarea from '@/shared/ui/Textarea';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ProjectParticipationForm() {
  const [state, formAction, isPending] = useActionState(handleProjectParticipation, createInitialState<ParticipationProjectFormState>());
  const { id: projectId } = useParams();
  const { data: project } = useGetProjectById(Number(projectId));
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.status == "success") {
        toast.success(state.message);
        router.push('/main');
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <form className="flex flex-col w-full gap-16" action={formAction}>
      <div className="flex flex-col gap-6">
        <Input name="title" placeholder="제목을 입력해주세요" label="제목" defaultValue={project?.title} readOnly />
        <small className="text-error pl-1">{state.fieldErrors?.title}</small>
        <Textarea name="content" placeholder="프로젝트에서 했던 활동을 입력해주세요" label="내용" />
        <small className="text-error pl-1">{state.fieldErrors?.content}</small>
        <FileUploader name="fileIds" label="파일" placeholder="파일을 업로드해주세요" />
        <small className="text-error pl-1">{state.fieldErrors?.fileIds}</small>
        <Input name="projectId" type="hidden" value={projectId} readOnly />
      </div>

      <div className="flex flex-col gap-[10px]">
        <Button type="button" variant="border">
          임시저장
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? '작성 중...' : '작성 완료'}
        </Button>
      </div>
    </form>
  );
}
