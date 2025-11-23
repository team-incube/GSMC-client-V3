'use client';

import { useActionState, useEffect } from 'react';

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
  englishName: string;
  setIsEditModalOpen: (isOpen: boolean) => void;
}

export default function ScoreEditForm({ scoreData, category, englishName, setIsEditModalOpen }: ScoreValueEditFormProps) {
  const [state, formAction, isPending] = useActionState(handleScoreValueEdit, createInitialState<ScoreFormValueType>());

  useEffect(() => {
    if (state.message) {
      if (state.status === 'success') {
        toast.success(state.message);
        setIsEditModalOpen(false);
      } else {
        toast.error(state.message);
      }
    }
  }, [state, setIsEditModalOpen]);

  return (
    <form action={formAction} className="flex min-w-[400px] flex-col gap-4">
      <h2 className="mb-4 text-xl font-bold">{category.koreanName} 수정</h2>

      <input type="hidden" name="categoryType" value={englishName} />

      <Input
        name="value"
        label={`${category.koreanName}`}
        type={category.calculationType === 'COUNT_BASED' ? 'text' : 'number'}
        defaultValue={scoreData.scoreValue || scoreData.activityName}
      />
      {category.evidenceType === 'FILE' && <FileUploader label="파일 첨부" name="fileId" />}

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
