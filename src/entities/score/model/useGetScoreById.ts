import { useQuery } from '@tanstack/react-query';

import { getScoreById, getScoreByIdRequest } from '../api/getScoreById';

export const useGetScoreById = ({ scoreId }: getScoreByIdRequest) => {
  return useQuery({
    queryKey: ['score', scoreId],
    queryFn: () => getScoreById({ scoreId }),
    enabled: !!scoreId,
  });
};
