import { useMutation } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'sonner';

import { attachFile } from '@/entities/file/api/attachFile';

export const useOptimisticFileUpload = () => {
  return useMutation({
    mutationFn: async (files: File[]): Promise<number[]> => {
      if (files.length === 0) return [];
      const uploadedFiles = await Promise.all(files.map((file) => attachFile({ file })));
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
      const uploadedFile = await attachFile({ file: files[0] });
      return Number(uploadedFile.id);
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
