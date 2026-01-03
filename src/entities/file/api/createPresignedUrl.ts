import { instance } from '@/shared/lib/instance';

import { S3FileType } from '../model/file';

export interface CreatePresignedUrlRequest {
  fileName: string;
  fileSize: number;
  contentType: string;
}

export const createPresignedUrl = async ({
  fileName,
  fileSize,
  contentType,
}: CreatePresignedUrlRequest): Promise<S3FileType> => {
  const response = await instance.post(`/files/presigned-url`, { fileName, fileSize, contentType });
  return response.data.data;
};
