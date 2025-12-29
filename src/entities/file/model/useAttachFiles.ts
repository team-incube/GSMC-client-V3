import { useMutation, useQueryClient } from '@tanstack/react-query';

import { attachFile } from '../api/attachFile';
import { FileType } from './file';

export const useAttachFiles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (files: File[]): Promise<FileType[]> => {
      if (files.length === 0) return [];
      const results = await Promise.all(files.map((file) => attachFile({ file })));
      return results;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['file'] });
    },
  });
};
