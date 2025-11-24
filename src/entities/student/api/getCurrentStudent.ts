import { instance } from '@/shared/lib/instance';

import { StudentType } from '../model/student';

export const getCurrentStudent = async (): Promise<StudentType> => {
  const response = await instance.get('/members/current');
  return response.data.data;
};
