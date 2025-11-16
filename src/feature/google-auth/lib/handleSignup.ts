'use server';

import { redirect } from 'next/navigation';
import { postSignup } from '../api/postSignup';
import { SignupFormState } from '../model/initForm';
import { SignupSchema } from '../model/SignupSchema';
import { z } from 'zod';
import { toast } from 'sonner';
import axios from 'axios';

export async function handleSignup(
  prevState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  const name = String(formData.get('name') ?? '').trim();
  const studentNumber = String(formData.get('studentNumber') ?? '').trim();

  const result = SignupSchema.safeParse({ name, studentNumber });
  if (result.success) {
    const response = await postSignup({ name, studentNumber });
    if (response.status === 202) {
      toast.success('회원가입이 완료되었습니다. 다시 로그인해주세요.');
      
      axios.post('/api/auth/refresh');
      
      redirect('/main');
    }
    toast.error(response.message ?? '회원가입에 실패했습니다.');
    return {
      ...prevState,
      name,
      studentNumber,
      nameError: '',
      studentNumberError: '',
    };
  }

  const tree = z.treeifyError(result.error);
  return {
    name,
    studentNumber,
    nameError: tree.properties?.name?.errors[0] ?? '',
    studentNumberError: tree.properties?.studentNumber?.errors[0] ?? '',
  };
}
