'use client';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { SignupFormType, SignupSchema } from '@/feature/google-auth/model/SignupSchema';
import { useSignup } from '@/feature/google-auth/model/useSignup';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';

export default function SignupForm() {
  const router = useRouter();

  const { mutate: signup, isPending } = useSignup(() => router.push('/'));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      studentNumber: undefined,
    },
  });

  const onSubmit = (data: SignupFormType) => {
    signup(data);
  };

  return (
    <form className="flex flex-col gap-9" onSubmit={(e) => e.preventDefault()}>
      <div>
        <Input
          label="이름"
          placeholder="이름을 입력해주세요"
          {...register('name')}
        />
        <small className="text-error pl-1">{errors.name?.message}</small>
      </div>
      <div>
        <Input
          label="학번"
          maxLength={4}
          minLength={4}
          placeholder="학번을 입력해주세요"
          type="number"
          {...register('studentNumber', { valueAsNumber: true })}
        />
        <small className="text-error pl-1">{errors.studentNumber?.message}</small>
      </div>
      <Button type="button" disabled={isPending} onClick={handleSubmit(onSubmit)}>
        {isPending ? '처리 중...' : '회원가입'}
      </Button>
    </form>
  );
}
