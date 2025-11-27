import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { removeProjectById } from '../api/removeProjectById';

export const useRemoveProjectById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['project'],
    mutationFn: removeProjectById,
    onSuccess: () => {
      toast.success('프로젝트가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
    onError: () => toast.error('프로젝트 삭제에 실패했습니다.'),
  });
};
