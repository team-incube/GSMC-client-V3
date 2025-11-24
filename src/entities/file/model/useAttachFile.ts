import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { attachFile } from '../api/attachFile';

export const useAttachFile = () => {
  return useMutation({
    mutationFn: attachFile,
    onSuccess: () => toast.success('파일이 업로드 되었습니다'),
    onError: () => toast.error('파일 업로드에 실패하였습니다'),
  });
};
