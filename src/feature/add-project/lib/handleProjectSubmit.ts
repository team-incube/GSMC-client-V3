import { EvidenceSchema } from '@/shared/model/EvidenceSchema';

export interface SubmitState {
  success: boolean;
  titleError: string;
  contentError: string;
  fileError: string;
  title: string;
  content: string;
  file: number[] | null;
  message?: string;
}

export const initialState: SubmitState = {
  success: false,
  titleError: '',
  contentError: '',
  fileError: '',
  title: '',
  content: '',
  file: null,
};

export const handleProjectSubmit = async (
  _prevState: SubmitState,
  formData: FormData,
): Promise<SubmitState> => {
  try {
    const title = formData.get('title');
    const content = formData.get('content');
    const image = formData.get('image');

    const result = EvidenceSchema.safeParse({
      title,
      content,
      image,
    });

    if (!result.success) {
      const { fieldErrors, formErrors } = result.error.flatten();
      return {
        ...initialState,
        success: false,
        titleError: fieldErrors.title?.[0] ?? '',
        contentError: fieldErrors.content?.[0] ?? '',
        fileError: fieldErrors.fileId?.[0] ?? '',
        message:
          formErrors[0] ??
          fieldErrors.title?.[0] ??
          fieldErrors.content?.[0] ??
          fieldErrors.fileId?.[0] ??
          '입력 값이 올바르지 않습니다.',
      };
    }

    return {
      ...initialState,
      success: true,
      title: result.data.title,
      content: result.data.content,
      file: result.data.fileId ?? null,
      message: '프로젝트가 정상적으로 제출되었습니다.',
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ...initialState,
        success: false,
        message: error.message,
      };
    }
    throw error;
  }
};
