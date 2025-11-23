import { instance } from '@/shared/lib/instance';

import { SignupFormValueType } from '../model/SignupSchema';

export const postSignup = async ({ name, studentNumber }: SignupFormValueType) => {
  const response = await instance.post('/auth/signup', {
    name,
    studentNumber,
  });
  return response.data;
};
