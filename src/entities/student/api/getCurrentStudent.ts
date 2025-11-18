import { instance } from '@/shared/lib/instance';
import type { StudentType } from '../model/StudentSchema';

/**
 * 현재 인증된 사용자 정보 조회
 */
export const getCurrentStudent = async (): Promise<StudentType> => {
  const response = await instance.get('/members/current');
  return response.data.data;
};
