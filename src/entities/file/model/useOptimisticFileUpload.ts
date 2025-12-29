import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { attachFile } from '@/entities/file/api/attachFile';

interface UseOptimisticFileUploadOptions {
  toastIdRef: { current: string | number | undefined };
}

/**
 * 낙관적 업데이트를 위한 파일 업로드 훅
 * 여러 파일을 업로드하고 ID 배열을 반환합니다.
 */
export const useOptimisticFileUpload = ({ toastIdRef }: UseOptimisticFileUploadOptions) => {
  return useMutation({
    mutationFn: async (files: File[]): Promise<number[]> => {
      if (files.length === 0) return [];
      const uploadedFiles = await Promise.all(files.map((file) => attachFile({ file })));
      return uploadedFiles.map((f) => Number(f.id));
    },
    onError: () => {
      toast.error('파일 업로드에 실패했습니다.', { id: toastIdRef.current });
    },
  });
};

/**
 * 낙관적 업데이트를 위한 단일 파일 업로드 훅
 * 첫 번째 파일만 업로드하고 ID를 반환합니다.
 */
export const useOptimisticSingleFileUpload = ({ toastIdRef }: UseOptimisticFileUploadOptions) => {
  return useMutation({
    mutationFn: async (files: File[]): Promise<number | undefined> => {
      if (files.length === 0) return undefined;
      const uploadedFile = await attachFile({ file: files[0] });
      return Number(uploadedFile.id);
    },
    onError: () => {
      toast.error('파일 업로드에 실패했습니다.', { id: toastIdRef.current });
    },
  });
};
