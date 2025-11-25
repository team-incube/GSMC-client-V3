import { FileType } from '@/entities/file/model/file';
import { instance } from '@/shared/lib/instance';

export interface removeFileByIdRequest {
  id: number;
}

export const removeFileById = async ({ id }: removeFileByIdRequest): Promise<FileType> => {
  const response = await instance.delete(`/files/${id}`);
  return response.data.data;
};
