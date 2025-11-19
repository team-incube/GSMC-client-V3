import { instance } from '@/shared/lib/instance';
import type { RoleType, StudentType } from '../model/StudentSchema';

export interface GetSearchStudentRequest {
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

export const getSearchStudent = async (props: GetSearchStudentRequest): Promise<StudentType[]> => {
  const response = await instance.get('/members/search', {
    params: props,
  });

  return response.data.data.members;
};
