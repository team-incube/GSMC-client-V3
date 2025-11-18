import { useQuery } from '@tanstack/react-query';
import { getTotalScore } from '../api/getTotalScore';

export const useGetTotalScore = () => {
  return useQuery({
    queryKey: ['totalScore'],
    queryFn: () => getTotalScore(),
  });
};
