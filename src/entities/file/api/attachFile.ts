import { FileType } from '@/entities/file/model/file';
import { instance } from '@/shared/lib/instance';

export interface attachFileRequest {
  file: File;
}

export const attachFile = async ({ file }: attachFileRequest): Promise<FileType> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await instance.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};
