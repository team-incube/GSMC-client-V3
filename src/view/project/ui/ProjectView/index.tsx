"use client";
import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useGetProjectById } from "@/entities/project/model/useGetProjectById";
import { useRemoveProjectById } from "@/entities/project/model/useRemoveProjectById";
import { useGetCurrentStudent } from "@/entities/student/model/useGetCurrentStudent";
import getStudentCode from "@/shared/lib/getStudentCode";
import Button from "@/shared/ui/Button";
import ConfirmModal from "@/shared/ui/ConfirmModal";
import FileList from "@/shared/ui/FileList";

export default function ProjectView() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const params = useParams();
  const router = useRouter();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const projectId = Number(rawId);
  const { data: project, isSuccess } = useGetProjectById({ projectId });
  const { data: student } = useGetCurrentStudent();
  const { mutate } = useRemoveProjectById();

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    mutate({ projectId }, {
      onSuccess: () => {
        router.replace('/main');
      },
      onSettled: () => {
        setShowDeleteConfirm(false);
      }
    });
  };

  return (
    <>
      <div className="flex w-full justify-center px-4 py-15.5">
        <div className="flex w-full max-w-[600px] flex-col" >
          <div className="flex items-baseline justify-between">
            <h1 className="flex-1 text-main-700 text-titleMedium">{project?.title}</h1>
            {project?.ownerId === student?.id && isSuccess ? <div className="space-x-2">
              <button type="button" className="cursor-pointer" onClick={() => router.push(`/project-create?projectId=${projectId}`)}>수정</button>
              <button type="button" className="cursor-pointer" onClick={handleDeleteClick}>삭제</button>
            </div> : null}
          </div>
          <hr className="my-4" />
          <p className="whitespace-pre-wrap">{project?.description}</p>
          <hr className="my-4" />
          <FileList files={project?.files ?? []} />
          <hr className="my-4" />
          <div className='flex flex-col gap-4'>
            {project?.participants.map((participant) => (
              <div
                key={participant.id}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100"
              >
                <div className="flex gap-1 text-sm font-medium text-gray-700" >
                  <span>
                    {participant.id === project.ownerId ? '팀장' : '팀원'}
                  </span>
                  <span >
                    {participant.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500 tabular-nums">
                  {getStudentCode({ grade: participant.grade, classNumber: participant.classNumber, number: participant.number })}
                </span>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          {
            !project?.participants?.some((p) => p.id === student?.id) ? (
              <Button variant="disabled" className="cursor-not-allowed" disabled>
                참여한 프로젝트가 아닙니다.
              </Button>
            ) : (
              <Button onClick={() => router.push(`/project-participation?projectId=${projectId}`)}>
                프로젝트 참여글 작성하기
              </Button>
            )
          }

        </div>
      </div>

      {showDeleteConfirm ? <ConfirmModal
        title="프로젝트 삭제"
        message="정말 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
      /> : null}
    </>
  )
}

const Loading = () => {
  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col animate-pulse">
        <div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />
        <hr className="my-4" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-4/6 bg-gray-200 rounded" />
        </div>
        <hr className="my-4" />
        <div className="h-24 w-full bg-gray-100 rounded mb-4" />
        <hr className="my-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 w-full bg-gray-50 rounded-lg border border-gray-100" />
          ))}
        </div>
        <hr className="my-4" />
        <div className="h-12 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );
};

const ErrorFallback = () => {
  return (
    <div className="flex w-full justify-center px-4 py-15.5">
      <div className="flex w-full max-w-[600px] flex-col items-center justify-center h-[400px] gap-4">
        <p className="text-error font-semibold text-lg">프로젝트 정보를 불러오는데 실패했습니다.</p>
        <Button onClick={() => window.location.reload()} variant="border">다시 시도</Button>
      </div>
    </div>
  );
};

ProjectView.Loading = Loading;
ProjectView.Error = ErrorFallback;