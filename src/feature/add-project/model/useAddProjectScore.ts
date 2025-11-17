import { useMutation } from '@tanstack/react-query';
import { addProjectScore } from '../api/addProjectScore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useAddProjectScore = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addProjectScore,
    onSuccess: () => {
      toast.success('프로젝트 등록에 성공했습니다');
      router.back();
    },
    onError: (e: Error) => {
      toast.error(e.message);
    },
  });
};
