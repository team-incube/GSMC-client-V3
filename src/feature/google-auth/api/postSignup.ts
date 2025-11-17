import { instance } from '@/shared/lib/axios';
import { SignupFormValueType } from '../model/SignupSchema';
import { isAxiosError } from 'axios';

export const postSignup = async ({ name, studentNumber }: SignupFormValueType) => {
  try {
    const response = await instance.post('/auth/signup', {
      name,
      studentNumber,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data.message || 'An error occurred during signup.';
    }
    throw error;
  }
};
