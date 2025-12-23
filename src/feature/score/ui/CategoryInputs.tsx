import { Controller, FieldErrors, useFormContext } from 'react-hook-form';

import Link from 'next/link';

import { CategoryType } from '@/entities/category/model/category';
import { FileType } from '@/entities/file/model/file';
import { ScoreFormValues } from '@/feature/score/model/scoreForm.schema';
import Dropdown from '@/shared/ui/Dropdown';
import FileUploader from '@/shared/ui/FileUploader';
import Input from '@/shared/ui/Input';

interface CategoryInputsProps {
  category: CategoryType;
  initialData?: {
    scoreValue?: string | number;
    activityName?: string;
    file?: FileType;
  };
  errors: FieldErrors<ScoreFormValues>;
}

export default function CategoryInputs({
  category,
  initialData,
  errors,
}: CategoryInputsProps) {
  const { register, control } = useFormContext<ScoreFormValues>();

  // 1. 자격증 (Certificate)
  if (category.englishName === 'CERTIFICATE') {
    return (
      <>
        <Input
          label="자격증 이름"
          placeholder="자격증 이름을 입력해주세요"
          {...register('value')}
        />
        <small className="pl-1 text-error">{errors.value?.message}</small>
        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <FileUploader
              label="자격증 인증서 첨부"
              uploadedFiles={initialData?.file}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.files?.message}</small>
      </>
    );
  }

  // 2. TOPCIT
  if (category.englishName === 'TOPCIT') {
    return (
      <>
        <Input
          label="TOPCIT 점수"
          type="number"
          placeholder="점수를 입력해주세요"
          {...register('value')}
        />
        <small className="pl-1 text-error">{errors.value?.message}</small>
        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <FileUploader
              label="TOPCIT 인증서 첨부"
              uploadedFiles={initialData?.file}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.files?.message}</small>
      </>
    );
  }

  // 3. TOEIC
  if (category.englishName === 'TOEIC') {
    return (
      <>
        <Input
          label="TOEIC 점수"
          type="number"
          placeholder="점수를 입력해주세요"
          {...register('value')}
        />
        <small className="pl-1 text-error">{errors.value?.message}</small>
        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <FileUploader
              label="성적표 첨부"
              uploadedFiles={initialData?.file}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.files?.message}</small>
      </>
    );
  }

  // 4. JLPT
  if (category.englishName === 'JLPT') {
    return (
      <>
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="JLPT 등급"
              options={[
                { label: 'N1', value: '1' },
                { label: 'N2', value: '2' },
                { label: 'N3', value: '3' },
                { label: 'N4', value: '4' },
                { label: 'N5', value: '5' },
              ]}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.value?.message}</small>
        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <FileUploader
              label="성적증명서 첨부"
              uploadedFiles={initialData?.file}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.files?.message}</small>
      </>
    );
  }

  // 5. TOEIC-ACADEMY (토익 사관학교)
  if (category.englishName === 'TOEIC-ACADEMY') {
    return (
      <>
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="toeicAcademy"
                checked={field.value === 'true'}
                onChange={(e) => field.onChange(e.target.checked ? 'true' : 'false')}
                className="h-4 w-4 accent-main-500 cursor-pointer"
              />
              <label htmlFor="toeicAcademy" className="text-sm font-medium">
                토익 사관학교 수료
              </label>
            </div>
          )}
        />
        <small className="pl-1 text-error">{errors.value?.message}</small>
      </>
    );
  }

  // 6. 독서활동 (Reading)
  if (category.englishName === 'READ-A-THON') {
    return (
      <>
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="빛고을 독서마라톤"
              options={[
                { label: '거북이', value: '1' },
                { label: '악어', value: '2' },
                { label: '토끼', value: '3' },
                { label: '타조', value: '4' },
                { label: '사자', value: '5' },
                { label: '호랑이', value: '6' },
                { label: '월계관', value: '7' },
              ]}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.value?.message}</small>
        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <FileUploader
              label="독서마라톤 완주증서 첨부"
              uploadedFiles={initialData?.file}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.files?.message}</small>
      </>
    );
  }

  // 7. 봉사 (Volunteer)
  if (category.englishName === 'VOLUNTEER') {
    return (
      <>
        <Input
          label="봉사 점수 (담임선생님 입력)"
          type="number"
          placeholder="봉사 점수"
          readOnly
          {...register('value')}
        />
        <small className="pl-1 text-error">{errors.value?.message}</small>
      </>
    );
  }

  // 8. 직업기초 능력평가 (NCS)
  if (category.englishName === 'NCS') {
    return (
      <>
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="등급"
              options={[
                { label: '1등급', value: '1' },
                { label: '2등급', value: '2' },
                { label: '3등급', value: '3' },
                { label: '4등급', value: '4' },
                { label: '5등급', value: '5' },
              ]}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.value?.message}</small>
        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <FileUploader
              label="직기초 인증서 첨부"
              uploadedFiles={initialData?.file}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.files?.message}</small>
      </>
    );
  }

  // 9. 수상경력 (Award)
  if (category.englishName === 'AWARD') {
    return (
      <>
        <Input
          label="수상경력 제목"
          placeholder="수상경력 제목을 입력해주세요"
          {...register('value')}
        />
        <small className="pl-1 text-error">{errors.value?.message}</small>
        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <FileUploader
              label="수상경력 증빙 파일"
              uploadedFiles={initialData?.file}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.files?.message}</small>
      </>
    );
  }

  // 10. 뉴로우스쿨 참여 (Neuro School)
  if (category.englishName === 'NEWRROW-SCHOOL') {
    return (
      <>
        <Input
          type="number"
          label="회고온도"
          placeholder="회고온도를 입력해주세요"
          {...register('value')}
        />
        <small className="pl-1 text-error">{errors.value?.message}</small>
        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <FileUploader
              label="증빙가능한 이미지 첨부"
              uploadedFiles={initialData?.file}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.files?.message}</small>
      </>
    );
  }

  // 11. 교과성적 (Academic Grade)
  if (category.englishName === 'ACADEMIC-GRADE') {
    return (
      <>
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="교과성적 등급 (담임선생님 입력)"
              options={[
                { label: '1등급', value: '1' },
                { label: '2등급', value: '2' },
                { label: '3등급', value: '3' },
                { label: '4등급', value: '4' },
                { label: '5등급', value: '5' },
                { label: '6등급', value: '6' },
                { label: '7등급', value: '7' },
                { label: '8등급', value: '8' },
                { label: '9등급', value: '9' },
              ]}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.value?.message}</small>
        <p className="text-xs text-gray-500">
          ※ 2025학년도 1학년: 5등급제 (1등급:9점, 2등급:8점...)<br />
          ※ 2026학년도부터: 1,2학년 모두 5등급제
        </p>
      </>
    );
  }

  // 12. 프로젝트 참여 (Project Participation)
  if (category.englishName === 'PROJECT-PARTICIPATION') {
    return (
      <div className="flex flex-col gap-4 items-center justify-center py-6">
        <p className="text-center text-gray-600 mb-4">
          프로젝트 참여 활동은 별도의 프로젝트 생성 페이지에서 진행해주세요.
        </p>
        <Link
          href="/projects/create"
          className="px-4 py-2 bg-main-500 text-white rounded-md hover:bg-main-600 transition-colors"
        >
          프로젝트 생성하러 가기
        </Link>
      </div>
    );
  }

  // 13. 외부활동 (External Activity)
  if (category.englishName === 'EXTERNAL-ACTIVITY') {
    return (
      <>
        <Input
          label="외부활동 제목"
          placeholder="외부활동 제목을 입력해주세요"
          {...register('value')}
        />
        <small className="pl-1 text-error">{errors.value?.message}</small>
        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <FileUploader
              label="외부활동 증빙 파일"
              uploadedFiles={initialData?.file}
              onChange={field.onChange}
            />
          )}
        />
        <small className="pl-1 text-error">{errors.files?.message}</small>
      </>
    );
  }

  // 기본 폼 (fallback)
  return (
    <>
      <Input
        label={`${category.koreanName}`}
        type={category.calculationType === 'COUNT_BASED' ? 'text' : 'number'}
        placeholder={
          category.calculationType === 'COUNT_BASED'
            ? '갯수/내용을 입력해주세요'
            : '점수를 입력해주세요'
        }
        {...register('value')}
      />
      <small className="pl-1 text-error">{errors.value?.message}</small>

      {category.evidenceType === 'FILE' && (
        <>
          <Controller
            name="files"
            control={control}
            render={({ field }) => (
              <FileUploader
                label="파일 첨부"
                uploadedFiles={initialData?.file || undefined}
                onChange={field.onChange}
              />
            )}
          />
          <small className="pl-1 text-error">{errors.files?.message}</small>
        </>
      )}
    </>
  );
}
