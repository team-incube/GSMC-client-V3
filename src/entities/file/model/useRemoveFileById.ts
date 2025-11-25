import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { removeFileById } from '../api/removeFileById';

export const useRemoveFileById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFileById,
    onSuccess: () => {
      toast.success('파일이 삭제 되었습니다')
      queryClient.invalidateQueries({ queryKey: ['file'] });
    },
    onError: () => toast.error('파일 삭제에 실패하였습니다'),
  });
};
