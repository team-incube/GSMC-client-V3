'use client';

import { useActionState, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CategoryType } from '@/entities/category/model/category';
import { FileType } from '@/entities/file/model/file';
import { handleScoreAction } from '@/feature/score/lib/handleScoreAction';
import { ScoreFormValues } from '@/feature/score/model/scoreForm.schema';
import CategoryInputs from '@/feature/score/ui/CategoryInputs';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';

export interface ScoreFormProps {
  mode?: 'create' | 'edit';
  category: CategoryType;
  initialData?: {
    scoreId?: number;
    scoreValue?: string | number;
    activityName?: string;
    file?: FileType;
  };
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function ScoreForm({
  mode = 'create',
  category,
  initialData,
  setIsModalOpen,
}: ScoreFormProps) {
  const [state, formAction, isPending] = useActionState(
    handleScoreAction,
    createInitialState<ScoreFormValues>()
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state.message) {
      if (state.status === 'success') {
        toast.success(state.message);
        queryClient.invalidateQueries({ queryKey: ['score'] });
        setIsModalOpen(false);
      } else {
        toast.error(state.message);
      }
    }
  }, [state, setIsModalOpen, queryClient]);

  return (
    <form action={formAction} className="flex min-w-[400px] flex-col gap-4">
      <div className="flex items-start justify-between">
        <h2 className="mb-4 text-xl font-bold">
          {category.koreanName} {mode === 'create' ? '추가' : '수정'}
        </h2>
        {mode === 'edit' && category.englishName !== 'ACADEMIC-GRADE' && (
          <button type="submit" name="intent" value="delete" className="w-auto cursor-pointer">
            점수 삭제
          </button>
        )}
      </div>

      <input type="hidden" name="evidenceType" value={category.evidenceType} />
      {initialData?.scoreId !== undefined && (
        <input type="hidden" name="scoreId" value={initialData.scoreId} />
      )}

      <CategoryInputs
        category={category}
        mode={mode}
        initialData={initialData}
        state={state}
      />

      {category.englishName !== 'PROJECT-PARTICIPATION' && (
        <div className="mt-6 flex gap-2">
          <Button type="button" variant="border" onClick={() => setIsModalOpen(false)}>
            취소
          </Button>
          {category.englishName !== 'ACADEMIC-GRADE' && (
            <Button
              type="submit"
              disabled={isPending}
              name="intent"
              value={mode === 'create' ? 'create' : 'update'}
            >
              {mode === 'create' ? '추가하기' : '수정하기'}
            </Button>
          )}
        </div>
      )}
    </form>
  );
}
