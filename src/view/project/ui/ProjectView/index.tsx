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
  const { data: project, isLoading, isSuccess } = useGetProjectById({ projectId });
  const { data: student } = useGetCurrentStudent();
  const { mutate } = useRemoveProjectById();

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    mutate({ projectId }, {
      onSuccess: () => {
        router.replace('/main');
      }
    });
    setShowDeleteConfirm(false);
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
          <Button onClick={() => router.push(`/project-participation?projectId=${projectId}`)}>
            프로젝트 참여글 작성하기
          </Button>
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