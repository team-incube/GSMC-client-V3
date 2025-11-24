import { FileType } from '@/entities/file/model/file';
import { instance } from '@/shared/lib/instance';

export interface removeFileByIdRequest {
  fileId: number;
}

export const removeFileById = async ({ fileId }: removeFileByIdRequest): Promise<FileType> => {
  const response = await instance.delete(`/files/${fileId}`);
  return response.data.data;
};
