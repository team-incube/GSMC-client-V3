'use client';

import { useActionState, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CategoryKey, CategoryType } from '@/entities/category/model/category';
import { FileType } from '@/entities/file/model/file';
import { handleScoreAction } from '@/feature/score/lib/handleScoreAction';
import { ScoreFormValues } from '@/feature/score/model/scoreForm.schema';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
import Dropdown from '@/shared/ui/Dropdown';
import FileUploader from '@/shared/ui/FileUploader';
import Input from '@/shared/ui/Input';

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
  const [isTosagwan, setIsTosagwan] = useState(false);
  const [selectedCategoryType, setSelectedCategoryType] = useState(category.englishName);

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
        {mode === 'edit' && (
          <button type="submit" name="intent" value="delete" className="w-auto cursor-pointer">
            점수 삭제
          </button>
        )}
      </div>

      <input type="hidden" name="categoryType" value={selectedCategoryType} />
      <input type="hidden" name="evidenceType" value={category.evidenceType} />
      {initialData?.scoreId !== undefined && (
        <input type="hidden" name="scoreId" value={initialData.scoreId} />
      )}

      {category.isForeignLanguage ? (
        <div className="flex flex-col gap-4">
          <Dropdown
            label="어학 종류"
            options={['TOEIC', 'JLPT']}
            value={selectedCategoryType}
            onChange={(value) => setSelectedCategoryType(value as CategoryKey)}
          />

          <Input
            name="value"
            label="점수"
            type="number"
            placeholder="점수를 입력해주세요"
            defaultValue={initialData?.scoreValue}
          />
          <small className="pl-1 text-error">{state.fieldErrors?.value}</small>

          <FileUploader label="파일 첨부" name="fileId" uploadedFiles={initialData?.file} />
          <small className="pl-1 text-error">{state.fieldErrors?.fileId}</small>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="tosagwan"
              checked={isTosagwan}
              onChange={(e) => setIsTosagwan(e.target.checked)}
              className="h-4 w-4 accent-main-500"
            />
            <label htmlFor="tosagwan" className="text-sm font-medium">
              토사관
            </label>
          </div>
        </div>
      ) : (
        <>
          <Input
            name="value"
            label={`${category.koreanName}`}
            type={category.calculationType === 'COUNT_BASED' ? 'text' : 'number'}
            placeholder={
              category.calculationType === 'COUNT_BASED'
                ? '갯수/내용을 입력해주세요'
                : '점수를 입력해주세요'
            }
            defaultValue={initialData?.scoreValue || initialData?.activityName}
          />
          <small className="pl-1 text-error">{state.fieldErrors?.value}</small>

          {category.evidenceType === 'FILE' && (
            <>
              <FileUploader label="파일 첨부" name="fileId" uploadedFiles={initialData?.file || undefined} />
              <small className="pl-1 text-error">{state.fieldErrors?.fileId}</small>
            </>
          )}
        </>
      )}

      <div className="mt-6 flex gap-2">
        <Button type="button" variant="border" onClick={() => setIsModalOpen(false)}>
          취소
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          name="intent"
          value={mode === 'create' ? 'create' : 'update'}
        >
          {mode === 'create' ? '추가하기' : '수정하기'}
        </Button>
      </div>
    </form>
  );
}
