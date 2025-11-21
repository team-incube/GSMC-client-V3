import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { attachFile } from '@/shared/api/attachFile';

export const useAttachFile = () => {
  const [uploadedFileIds, setUploadedFileIds] = useState<number[]>([]);

  const mutation = useMutation({
    mutationFn: attachFile,
    onSuccess: (data) => {
      toast.success('파일이 업로드 되었습니다');
      if (data?.id) {
        setUploadedFileIds((prev) => [...prev, data.id]);
      }
    },
    onError: (e: Error) => toast.error(e.message ?? '파일 업로드에 실패하였습니다'),
  });

  const removeFileId = (id: number) => {
    setUploadedFileIds((prev) => prev.filter((fileId) => fileId !== id));
  };

  return {
    attachFile: mutation.mutate,
    loading: mutation.isPending,
    uploadedFileIds,
    removeFileId,
  };
};
