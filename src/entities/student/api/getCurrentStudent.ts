import { instance } from '@/shared/lib/instance';
import type { StudentType } from '../model/StudentSchema';

export const getCurrentStudent = async (): Promise<StudentType> => {
  const response = await instance.get('/members/current');
  return response.data.data;
};
