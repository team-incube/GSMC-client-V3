import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { removeScoreById, removeScoreByIdTypeRequest } from '../api/removeScoreById';

export const useRemoveScoreById = ({ scoreId }: removeScoreByIdTypeRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['score', scoreId],
    mutationFn: () => removeScoreById({ scoreId }),
    onSuccess: () => {
      toast.success('점수가 성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['score'] });
    },
    onError: () => {
      toast.error('점수 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
