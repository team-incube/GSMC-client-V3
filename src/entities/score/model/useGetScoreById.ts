import { useQuery } from '@tanstack/react-query';

import { getScoreById, GetScoreByIdRequest } from '../api/getScoreById';

export const useGetScoreById = (
  { scoreId }: GetScoreByIdRequest,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ['score', scoreId],
    queryFn: () => getScoreById({ scoreId }),
    enabled: options?.enabled ?? !!scoreId,
  });
};
