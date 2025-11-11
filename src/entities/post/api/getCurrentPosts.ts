import { instance } from "@/shared/lib/axios";
import { PostType } from "../model/PostSchema";

/**
 * 현재 인증된 사용자 증빙자료 조회
 * @Todo MainView에서 사용 예정
 * @status UNUSED - 구현됨, 아직 사용되지 않음
 */
export const getCurrentPosts = async (): Promise<PostType[]> => {
  try {
    const response = await instance.get('/evidences/current');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
