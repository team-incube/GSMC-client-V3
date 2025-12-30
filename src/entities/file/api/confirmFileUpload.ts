import { instance } from '@/shared/lib/instance';

import { FileType } from '../model/file';

export interface confirmFileUploadRequest {
  fileKey: string;
  originalFileName: string;
}

export const confirmFileUpload = async ({
  fileKey,
  originalFileName,
}: confirmFileUploadRequest): Promise<FileType> => {
  const response = await instance.post(`/files/confirm`, { fileKey, originalFileName });
  return response.data.data;
};
