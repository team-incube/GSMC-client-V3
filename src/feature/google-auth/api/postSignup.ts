import { instance } from '@/shared/lib/axios';
import { SignupFormValueType } from '../model/SignupSchema';
import { isAxiosError } from 'axios';

export const postSignup = async ({ name, studentNumber }: SignupFormValueType) => {
  try {
    const response = await instance.post('/auth/signup', {
      name,
      studentNumber,
    });
    console.log('Signup Response:', response.data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Signup Error:', error.response?.data);
      throw error.response?.data.message || 'An error occurred during signup.';
    }
    throw error;
  }
};
