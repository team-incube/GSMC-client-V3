import { useMutation } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'sonner';

import { postSignup } from '@/feature/google-auth/api/postSignup';
import { SignupFormType } from '@/feature/google-auth/model/SignupSchema';

const handleSignupError = (error: unknown): string => {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status === HttpStatusCode.NotFound) return '존재하지 않는 사용자입니다.';
    if (status === HttpStatusCode.Conflict) return '이미 사용 중인 학번입니다.';
  }
  return '회원가입에 실패했습니다.';
};

export const useSignup = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: async (data: SignupFormType) => {
      await postSignup(data);
    },
    onSuccess: () => {
      toast.success('회원가입에 성공했습니다. 다시 로그인해주세요.');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(handleSignupError(error));
    },
  });
};
