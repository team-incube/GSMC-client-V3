"use client";

import { useActionState, useEffect, useState } from "react";

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CategoryKey, CategoryType } from '@/entities/category/model/category';
import { handleScoreAdd } from '@/feature/score-add/lib/handleScoreAdd';
import { ScoreAddFormValueType } from '@/feature/score-add/model/ScoreAddSchema';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
import Dropdown from "@/shared/ui/Dropdown";
import FileUploader from '@/shared/ui/FileUploader';
import Input from '@/shared/ui/Input';

interface ScoreAddFormProps {
  category: CategoryType;
  setIsAddModalOpen: (isOpen: boolean) => void;
}

export default function ScoreAddForm({ category, setIsAddModalOpen }: ScoreAddFormProps) {
  const [state, formAction, isPending] = useActionState(handleScoreAdd, createInitialState<ScoreAddFormValueType>());
  const queryClient = useQueryClient();
  const [isTosagwan, setIsTosagwan] = useState(false);
  const [selectedCategoryType, setSelectedCategoryType] = useState(category.englishName);

  useEffect(() => {
    if (state.message) {
      if (state.status === 'success') {
        toast.success(state.message);
        queryClient.invalidateQueries({ queryKey: ['score'] });
        setIsAddModalOpen(false);
      } else {
        toast.error(state.message);
      }
    }
  }, [state, setIsAddModalOpen, queryClient]);

  return (
    <form action={formAction} className="flex min-w-[400px] flex-col gap-4">
      <h2 className="mb-4 text-xl font-bold">
        {category.koreanName} 추가
      </h2>

      <input type="hidden" name="categoryType" value={selectedCategoryType} />
      <input type="hidden" name="evidenceType" value={category.evidenceType} />

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
          />
          <small className="pl-1 text-error">{state.fieldErrors?.value}</small>

          <FileUploader label="파일 첨부" name="fileId" />
          <small className="pl-1 text-error">{state.fieldErrors?.fileId}</small>


          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="tosagwan"
              checked={isTosagwan}
              onChange={(e) => setIsTosagwan(e.target.checked)}
              className="w-4 h-4 accent-main-500"
            />
            <label htmlFor="tosagwan" className="text-sm font-medium">토사관</label>
          </div>
        </div>
      ) : (
        <>
          <Input
            name="value"
            label={`${category.koreanName}`}
            type={category.calculationType === 'COUNT_BASED' ? 'text' : 'number'}
            placeholder={category.calculationType === 'COUNT_BASED' ? '갯수/내용을 입력해주세요' : '점수를 입력해주세요'}
          />
          <small className="pl-1 text-error">{state.fieldErrors?.value}</small>

          {category.evidenceType === 'FILE' && (
            <>
              <FileUploader label="파일 첨부" name="fileId" />
              <small className="pl-1 text-error">{state.fieldErrors?.fileId}</small>
            </>
          )}
        </>
      )}

      <div className="mt-6 flex gap-2">
        <Button type="button" variant="border" onClick={() => setIsAddModalOpen(false)}>
          취소
        </Button>
        <Button type="submit" disabled={isPending}>
          추가하기
        </Button>
      </div>
    </form>
  );
}
