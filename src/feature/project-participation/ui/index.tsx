'use client';

import { useActionState } from 'react';
import { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { useGetProjectById } from '@/entities/project/model/useGetProjectById';
import { useGetScoreById } from '@/entities/score/model/useGetScoreById';
import { useGetCurrentStudent } from '@/entities/student/model/useGetCurrentStudent';
import { handleProjectParticipation } from '@/feature/project-participation/lib/handleProjectParticipation';
import { ParticipationProjectFormValueType } from '@/feature/project-participation/model/ParticipationProjectSchema';
import { createInitialState } from '@/shared/lib/createInitialState';
import getStudentCode from '@/shared/lib/getStudentCode';
import { Accordian } from '@/shared/ui/Accordian';
import Button from '@/shared/ui/Button';
import FileUploader from '@/shared/ui/FileUploader';
import Input from '@/shared/ui/Input';
import Textarea from '@/shared/ui/Textarea';

export default function ProjectParticipationForm() {
  const [state, formAction, isPending] = useActionState(handleProjectParticipation, createInitialState<ParticipationProjectFormValueType>());
  const params = useParams();
  const router = useRouter();

  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const projectId = Number(rawId);

  const { data: project } = useGetProjectById({ projectId });

  const { data: student } = useGetCurrentStudent();

  const scoreId = project?.participants.find((p) => p.id === student?.id)?.scoreId;

  const { data: score } = useGetScoreById({ scoreId })

  useEffect(() => {
    if (state.message) {
      if (state.status === "success") {
        toast.success(state.message);
        router.push('/main');
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <>
      <Accordian title={project?.title}>
        <p className="whitespace-pre-wrap">{project?.description}</p>
        <div className='flex gap-4'>
          {project?.participants.map((participant) => (
            <div key={participant.id}>
              <span>
                {participant.name}
              </span>
              <span className='tabular-nums'>
                {getStudentCode({ grade: participant.grade, classNumber: participant.classNumber, number: participant.number })}
              </span>
            </div>
          ))}
        </div>
      </Accordian>

      <form className="flex flex-col w-full gap-16" action={formAction}>
        <div className="flex flex-col gap-6">
          <Input name="title" placeholder="제목을 입력해주세요" label="제목" defaultValue={score?.evidence?.title} />
          <small className="text-error pl-1">{state.fieldErrors?.title}</small>
          <Textarea name="content" placeholder="프로젝트에서 했던 활동을 입력해주세요" label="내용" defaultValue={score?.evidence?.content} />
          <small className="text-error pl-1">{state.fieldErrors?.content}</small>
          <FileUploader name="fileIds" label="파일" placeholder="파일을 업로드해주세요" uploadedFiles={score?.evidence?.files ?? undefined} isMultiple />
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
    </>
  );
}
