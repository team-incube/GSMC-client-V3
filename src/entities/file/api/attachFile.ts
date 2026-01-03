import { FileType } from '@/entities/file/model/file';
import { instance } from '@/shared/lib/instance';

export interface AttachFileRequest {
  file: File;
}

export const attachFile = async ({ file }: AttachFileRequest): Promise<FileType> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await instance.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};
