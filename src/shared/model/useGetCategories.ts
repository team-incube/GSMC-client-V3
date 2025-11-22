import { useQuery } from '@tanstack/react-query';

import { getCategories } from '../api/getCategories';

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['category', 'list'],
    queryFn: getCategories,
  });
};
