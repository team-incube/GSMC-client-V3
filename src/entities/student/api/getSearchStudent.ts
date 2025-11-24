import { instance } from '@/shared/lib/instance';

import { RoleType, StudentType } from '../model/student';

export interface getSearchStudentRequest {
  name?: string;
  email?: string;
  grade?: string;
  classNumber?: string;
  number?: string;
  role?: RoleType;
  limit?: number;
  page?: number;
  sortBy?: 'ASC' | 'DESC';
}

export const getSearchStudent = async (params: getSearchStudentRequest): Promise<StudentType[]> => {
  const response = await instance.get('/members/search', {
    params,
  });

  return response.data.data.members;
};
