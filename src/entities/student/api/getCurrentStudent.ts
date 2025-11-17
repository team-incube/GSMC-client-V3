import { instance } from '@/shared/lib/axios';
import type { StudentType } from '../model/StudentSchema';

/**
 * 현재 인증된 사용자 정보 조회
 * @Todo MainView에서 사용 예정
 * @status UNUSED - 구현됨, 아직 사용되지 않음
 */
export const getCurrentStudent = async (): Promise<StudentType> => {
  const response = await instance.get('/members/current');
  return response.data.data;
};
