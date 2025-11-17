import { useMutation } from '@tanstack/react-query';
import { attachFile } from '../api/attachFile';
import { toast } from 'sonner';

export const useAttachFile = () => {
  const mutation = useMutation({
    mutationFn: attachFile,
    onSuccess: () => toast.success('파일이 업로드 되었습니다'),
    onError: (e: Error) => toast.error(e.message ?? '파일 업로드에 실패하였습니다'),
  });

  return {
    attachFile: mutation.mutate,
    loading: mutation.isPending,
  };
};
