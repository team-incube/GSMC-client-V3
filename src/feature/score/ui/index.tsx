'use client';

import { startTransition, useActionState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CategoryType } from '@/entities/category/model/category';
import { FileType } from '@/entities/file/model/file';
import { ScoreStatus } from '@/entities/score/model/score';
import { handleScoreAction, ScoreActionData } from '@/feature/score/lib/handleScoreAction';
import {
  ScoreFormSchema,
  ScoreFormValues,
} from '@/feature/score/model/scoreForm.schema';
import CategoryInputs from '@/feature/score/ui/CategoryInputs';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
import Textarea from '@/shared/ui/Textarea';

export interface ScoreFormProps {
  mode?: 'create' | 'edit';
  category: CategoryType;
  initialData?: {
    scoreId?: number;
    scoreValue?: string | number;
    activityName?: string;
    file?: FileType;
    scoreStatus?: ScoreStatus;
    rejectionReason?: string;
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
    createInitialState<ScoreActionData>()
  );
  const queryClient = useQueryClient();

  const getDefaultValue = (): string => {
    if (initialData?.scoreValue !== undefined && initialData?.scoreValue !== null && initialData?.scoreValue !== '') {
      return String(initialData.scoreValue);
    }
    if (initialData?.activityName) {
      return initialData.activityName;
    }

    if (category.englishName === 'JLPT') return '1';
    if (category.englishName === 'READ-A-THON') return '1';
    if (category.englishName === 'NCS') return '1';
    if (category.englishName === 'ACADEMIC-GRADE') return '1';
    if (category.englishName === 'TOEIC-ACADEMY') return mode === 'edit' ? 'true' : 'false';
    return '';
  };

  const methods = useForm<ScoreFormValues>({
    resolver: zodResolver(ScoreFormSchema),
    defaultValues: {
      scoreId: initialData?.scoreId,
      categoryType: category.englishName.toLowerCase(),
      value: getDefaultValue(),
      evidenceType: category.evidenceType,
      files: {
        existing: initialData?.file ? [initialData.file] : [],
        new: [],
      },
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

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

  const onSubmit = (intent: 'create' | 'update' | 'delete') => {
    handleSubmit((data) => {
      const formData = new FormData();

      formData.append('intent', intent);
      formData.append('categoryType', data.categoryType);
      formData.append('value', data.value);
      formData.append('evidenceType', data.evidenceType);

      if (data.scoreId !== undefined) {
        formData.append('scoreId', String(data.scoreId));
      }

      data.files.existing.forEach((file: FileType) => {
        formData.append('existingFileIds', String(file.id));
      });
      data.files.new.forEach((file: File) => {
        formData.append('newFiles', file);
      });

      startTransition(() => {
        formAction(formData);
      });
    })();
  };

  return (
    <FormProvider {...methods}>
      <form className="flex min-w-[400px] flex-col gap-4">
        {initialData?.scoreStatus === 'REJECTED' && (
          <p className="text-error text-body2 font-bold -mb-4">탈락됨</p>
        )}
        <div className="flex items-start justify-between">
          <h2 className="mb-4 text-xl font-bold">
            {category.koreanName} {mode === 'create' ? '추가' : '수정'}
          </h2>
          {mode === 'edit' && category.englishName !== 'ACADEMIC-GRADE' && (
            <button
              type="button"
              onClick={() => onSubmit('delete')}
              className="w-auto cursor-pointer"
            >
              점수 삭제
            </button>
          )}
        </div>

        <CategoryInputs
          category={category}
          initialData={initialData}
          errors={errors}
        />

        {initialData?.scoreStatus === 'REJECTED' && !!initialData.rejectionReason && (
          <Textarea
            label="반려 사유"
            readOnly
            defaultValue={initialData.rejectionReason}
          />
        )}

        {category.englishName !== 'PROJECT-PARTICIPATION' && (
          <div className="mt-6 flex gap-2">
            <Button type="button" variant="border" onClick={() => setIsModalOpen(false)}>
              취소
            </Button>
            {category.englishName !== 'ACADEMIC-GRADE' && category.englishName !== 'VOLUNTEER' && (
              <Button
                type="button"
                disabled={isPending}
                onClick={() => onSubmit(mode === 'create' ? 'create' : 'update')}
              >
                {isPending ? '처리 중...' : mode === 'create' ? '추가하기' : '수정하기'}
              </Button>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
}
