import { FileType } from '@/entities/file/model/file';
import { instance } from '@/shared/lib/instance';

export interface RemoveFileByIdRequest {
  id: number;
}

export const removeFileById = async ({ id }: RemoveFileByIdRequest): Promise<FileType> => {
  const response = await instance.delete(`/files/${id}`);
  return response.data.data;
};
