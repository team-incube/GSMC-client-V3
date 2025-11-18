import { serverInstance } from '@/shared/lib/http/serverInstance';
import { SignupFormValueType } from '../model/SignupSchema';

export const postSignup = async ({ name, studentNumber }: SignupFormValueType) => {
  const response = await serverInstance.post('/auth/signup', {
    name,
    studentNumber,
  });
  return response.data;
};
