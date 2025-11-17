'use server';

import { redirect } from 'next/navigation';
import { postSignup } from '../api/postSignup';
import { SignupFormState } from '../model/initForm';
import { SignupSchema } from '../model/SignupSchema';
import { z } from 'zod';

export async function handleSignup(
  prevState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  const name = String(formData.get('name') ?? '').trim();
  const studentNumber = Number(formData.get('studentNumber'));
  const result = SignupSchema.safeParse({ name, studentNumber });

  if (result.success) {
    const response = await postSignup({ name, studentNumber });
    if (response.code === 202) {
      redirect('/');
    }

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
