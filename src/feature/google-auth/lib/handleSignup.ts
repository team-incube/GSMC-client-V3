'use server';

import { postSignup } from '../api/postSignup';
import { SignupSchema } from '../model/SignupSchema';
import { ActionState } from '@/shared/type/actionState';
import { SignupFormState } from '../model/SignupInitForm';
import z from 'zod';

export async function handleSignup(
  prevState: ActionState<SignupFormState>,
  formData: FormData,
): Promise<ActionState<SignupFormState>> {
  const currentData: SignupFormState = {
    name: String(formData.get('name') ?? '').trim(),
    studentNumber: Number(formData.get('studentNumber')),
  };

  const result = SignupSchema.safeParse(currentData);

  if (!result.success) {
    return {
      status: 'error',
      message: '입력값을 확인해주세요.',
      fieldErrors: z.flattenError(result.error).fieldErrors,
      data: currentData,
    };
  }

  const response = await postSignup(result.data);

  if (response.code === 202) {
    return {
      status: 'success',
      message: '회원가입에 성공했습니다. 다시 로그인해주세요.',
      fieldErrors: null,
      data: null,
    };
  }

  return {
    status: 'error',
    message: response.message || '회원가입에 실패했습니다.',
    fieldErrors: null,
    data: currentData,
  };
}
