import { instance } from '@/shared/lib/instance';

export const getFile = async () => {
  const response = await instance.get(`/files/my`);
  return response.data;
};
