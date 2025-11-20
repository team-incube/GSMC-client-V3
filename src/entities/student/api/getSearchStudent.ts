import { instance } from '@/shared/lib/instance';
import type { RoleType, StudentType } from '../model/StudentSchema';

export interface GetSearchStudentParams {
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

export const getSearchStudent = async (params: GetSearchStudentParams): Promise<StudentType[]> => {
  const response = await instance.get('/members/search', {
    params,
  });

  return response.data.data.members;
};
