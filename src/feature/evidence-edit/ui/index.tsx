'use client';

import { useActionState, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvidenceType } from '@/entities/evidence/model/evidence';
import { EvidenceFormValueType } from '@/feature/score-edit/model/ScoreEditSchema';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
import FileUploader from '@/shared/ui/FileUploader';
import Input from '@/shared/ui/Input';
import Textarea from '@/shared/ui/Textarea';

import { handleEvidenceEdit } from '../lib/handleEvidenceEdit';

interface EvidenceEditFormProps {
  evidenceData: EvidenceType;
  setIsEditModalOpen: (isOpen: boolean) => void;
  categoryName: string;
}

export default function EvidenceEditForm({ evidenceData, setIsEditModalOpen, categoryName }: EvidenceEditFormProps) {
  const [state, formAction, isPending] = useActionState(handleEvidenceEdit, createInitialState<EvidenceFormValueType>());
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state.message) {
      if (state.status === 'success') {
        toast.success(state.message);
        queryClient.invalidateQueries({ queryKey: ['evidence'] });
        queryClient.invalidateQueries({ queryKey: ['score'] });
        setIsEditModalOpen(false);
      } else {
        toast.error(state.message);
      }
    }
  }, [state, setIsEditModalOpen, queryClient]);

  return (
    <form action={formAction} className="flex min-w-[400px] flex-col gap-4">
      <h2 className="mb-4 text-xl font-bold">{categoryName} 수정</h2>

      <input type="hidden" name="evidenceId" value={evidenceData.evidenceId} />
      <Input label="제목" name="title" defaultValue={evidenceData.title} />
      <small className="pl-1 text-error">{state.fieldErrors?.title}</small>
      <Textarea label="내용" name="content" defaultValue={evidenceData.content} />
      <small className="pl-1 text-error">{state.fieldErrors?.content}</small>
      <FileUploader label="증빙자료" name="fileIds" />
      <small className="pl-1 text-error">{state.fieldErrors?.fileIds}</small>

      <div className="mt-6 flex gap-2">
        <Button type="button" variant="border" onClick={() => setIsEditModalOpen(false)}>
          취소
        </Button>
        <Button type="submit" disabled={isPending}>
          수정하기
        </Button>
      </div>
    </form>
  );
}
