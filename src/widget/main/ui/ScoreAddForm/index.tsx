'use client';

import { useActionState, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { handleScoreAdd } from '@/feature/score-add/lib/handleScoreAdd';
import { ScoreAddFormValueType } from '@/feature/score-add/model/ScoreAddSchema';
import { CategoryType } from '@/shared/api/getCategoryBySearch';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  if (category.evidenceType === 'EVIDENCE') {
    return (
      <div className="flex min-w-[400px] flex-col gap-4">
        <h2 className="mb-4 text-xl font-bold">{category.koreanName} 추가</h2>
        <p className="text-gray-600">
          프로젝트 참여 점수는 메인 페이지의 프로젝트 목록에서<br />
          참여하기를 통해 추가할 수 있습니다.
        </p>
        <div className="mt-6 flex gap-2">
          <Button type="button" onClick={() => setIsAddModalOpen(false)}>
            확인
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex min-w-[400px] flex-col gap-4">
      <h2 className="mb-4 text-xl font-bold">
        {category.isForeignLanguage ? '어학 점수' : category.koreanName} 추가
      </h2>

      <input type="hidden" name="categoryType" value={selectedCategoryType} />
      <input type="hidden" name="evidenceType" value={category.evidenceType} />

      {category.isForeignLanguage ? (
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 mb-1 block">어학 종류</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-200 rounded-lg text-left text-sm"
            >
              <span>{selectedCategoryType}</span>
              <span className="text-gray-400">▼</span>
            </button>
            {isDropdownOpen ? (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {['TOEIC', 'JLPT'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setSelectedCategoryType(lang);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

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

          {!isTosagwan ? (
            <Input
              name="value"
              label="점수"
              type="number"
              placeholder="점수를 입력해주세요"
            />
          ) : (
            <input type="hidden" name="value" value="토사관" />
          )}

          <small className="pl-1 text-error">{state.fieldErrors?.value}</small>

          <FileUploader label="파일 첨부" name="fileId" />
          <small className="pl-1 text-error">{state.fieldErrors?.fileId}</small>
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
