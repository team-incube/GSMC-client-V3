'use client';

import { useActionState, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ScoreType } from '@/entities/score/model/score';
import { handleScoreValueEdit } from '@/feature/score-edit/lib/handleScoreEdit';
import { ScoreFormValueType } from '@/feature/score-edit/model/ScoreEditSchema';
import { CategoryType } from '@/shared/api/getCategoryBySearch';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
import FileUploader from '@/shared/ui/FileUploader';
import Input from '@/shared/ui/Input';

interface ScoreValueEditFormProps {
  scoreData: ScoreType;
  category: CategoryType;
  setIsEditModalOpen: (isOpen: boolean) => void;
}

export default function ScoreEditForm({ scoreData, category, setIsEditModalOpen }: ScoreValueEditFormProps) {
  const [state, formAction, isPending] = useActionState(handleScoreValueEdit, createInitialState<ScoreFormValueType>());
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state.message) {
      if (state.status === 'success') {
        toast.success(state.message);
        queryClient.invalidateQueries({ queryKey: ['score'] });
        setIsEditModalOpen(false);
      } else {
        toast.error(state.message);
      }
    }
  }, [state, setIsEditModalOpen, queryClient]);

  return (
    <form action={formAction} className="flex min-w-[400px] flex-col gap-4">
      <h2 className="mb-4 text-xl font-bold">{category.koreanName} 수정</h2>

      <input type="hidden" name="categoryType" value={category.englishName} />
      <input type="hidden" name="evidenceType" value={category.evidenceType} />
      <Input
        name="value"
        label={`${category.koreanName}`}
        type={category.calculationType === 'COUNT_BASED' ? 'text' : 'number'}
        defaultValue={scoreData.scoreValue || scoreData.activityName}
      />
      <small className="pl-1 text-error">{state.fieldErrors?.value}</small>
      {category.evidenceType === 'FILE' && (
        <>
          <FileUploader label="파일 첨부" name="fileId" />
          <small className="pl-1 text-error">{state.fieldErrors?.fileId}</small>
        </>
      )}

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
