import { useMutation } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import axios from 'axios';
import { toast } from 'sonner';

import { confirmFileUpload } from '@/entities/file/api/confirmFileUpload';
import { createPresignedUrl } from '@/entities/file/api/createPresignedUrl';

import { FileType } from './file';

const uploadFile = async (file: File): Promise<FileType> => {
  const contentType = file.type || 'application/octet-stream';

  const presignedData = await createPresignedUrl({
    fileName: file.name,
    fileSize: file.size,
    contentType,
  });

  await axios.put(presignedData.presignedUrl, file, {
    headers: { 'Content-Type': contentType },
  });

  return confirmFileUpload({
    fileKey: presignedData.fileKey,
    originalFileName: file.name,
  });
};

export const useOptimisticFileUpload = () => {
  return useMutation({
    mutationFn: async (files: File[]): Promise<number[]> => {
      if (files.length === 0) return [];
      const uploadedFiles = await Promise.all(files.map(uploadFile));
      return uploadedFiles.map((f) => Number(f.id));
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatusCode.PayloadTooLarge) {
          toast.error('파일 크기가 너무 큽니다.');
          return;
        }
        if (status === HttpStatusCode.UnsupportedMediaType) {
          toast.error('지원되지 않는 파일 형식입니다.');
          return;
        }
      }
      toast.error('파일 업로드에 실패했습니다.');
    },
  });
};

export const useOptimisticSingleFileUpload = () => {
  return useMutation({
    mutationFn: async (files: File[]): Promise<number | undefined> => {
      if (files.length === 0) return undefined;
      const confirmedFile = await uploadFile(files[0]);
      return Number(confirmedFile.id);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === HttpStatusCode.PayloadTooLarge) {
          toast.error('파일 크기가 너무 큽니다. 10MB 이하의 파일을 업로드 해주세요.');
          return;
        }
        if (status === HttpStatusCode.UnsupportedMediaType) {
          toast.error('지원되지 않는 파일 형식입니다.');
          return;
        }
      }
      toast.error('파일 업로드에 실패했습니다.');
    },
  });
};
