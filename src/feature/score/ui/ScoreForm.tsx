'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { CategoryType } from '@/entities/category/model/category';
import { FileType } from '@/entities/file/model/file';
import { ScoreStatus } from '@/entities/score/model/score';
import { ScoreFormSchema, ScoreFormValues } from '@/feature/score/model/scoreForm.schema';
import { useOptimisticScoreMutation } from '@/feature/score/model/useOptimisticScoreMutation';
import CategoryInputs from '@/feature/score/ui/CategoryInputs';
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
  const closeModal = () => setIsModalOpen(false);

  const { createScore, updateScore, deleteScore } = useOptimisticScoreMutation();

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

  const processSubmit = (data: ScoreFormValues, intent: 'create' | 'update' | 'delete') => {
    if (intent === 'delete' && data.scoreId) {
      deleteScore.mutate({
        scoreId: data.scoreId,
        onSuccessCallback: closeModal,
      });
      return;
    }

    const optimisticData = {
      scoreId: data.scoreId,
      categoryType: data.categoryType,
      value: data.value,
      files: data.files,
      onSuccessCallback: closeModal,
    };

    if (intent === 'create') {
      createScore.mutate(optimisticData);
    } else {
      updateScore.mutate(optimisticData);
    }
  };

  const onSubmit = (intent: 'create' | 'update' | 'delete') => {
    handleSubmit((data) => processSubmit(data, intent))();
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
            <Button
              type="button"
              onClick={() => onSubmit(mode === 'create' ? 'create' : 'update')}
            >
              {mode === 'create' ? '추가하기' : '수정하기'}
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
}