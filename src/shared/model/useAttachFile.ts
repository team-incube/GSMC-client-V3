import { useMutation } from '@tanstack/react-query';
import { attachFile } from '../api/attachFile';
import { toast } from 'sonner';

export const useAttachFile = (file: File) => {
  return useMutation({
    mutationFn: () => attachFile(file),
    onSuccess: () => toast.success('파일이 업로드 되었습니다'),
    onError: (e) => toast.error(e.message ?? '파일 업로드에 실패하였습니다'),
  });
};
