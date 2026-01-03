import { instance } from '@/shared/lib/instance';

import { FileType } from '../model/file';

export interface ConfirmFileUploadRequest {
  fileKey: string;
  originalFileName: string;
}

export const confirmFileUpload = async ({
  fileKey,
  originalFileName,
}: ConfirmFileUploadRequest): Promise<FileType> => {
  const response = await instance.post(`/files/confirm`, { fileKey, originalFileName });
  return response.data.data;
};
