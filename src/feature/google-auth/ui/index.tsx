'use client';

import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { handleSignup } from '@/feature/google-auth/model/handleSignup';
import { SignupFormType, SignupSchema } from '@/feature/google-auth/model/SignupSchema';
import { createInitialState } from '@/shared/lib/createInitialState';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(handleSignup, createInitialState<SignupFormType>());
  const router = useRouter();

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

  useEffect(() => {
    if (state.message) {
      if (state.status === "success") {
        toast.success(state.message);
        router.push("/");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  const onSubmit = (data: SignupFormType) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('studentNumber', String(data.studentNumber));

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form className="flex flex-col gap-9" onSubmit={(e) => e.preventDefault()}>
      <div>
        <Input
          label="이름"
          placeholder="이름을 입력해주세요"
          {...register('name')}
        />
        <small className="text-error pl-1">{errors.name?.message || state.fieldErrors?.name}</small>
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
        <small className="text-error pl-1">{errors.studentNumber?.message || state.fieldErrors?.studentNumber}</small>
      </div>
      <Button
        type="button"
        disabled={isPending}
        onClick={handleSubmit(onSubmit)}
      >
        등록하기
      </Button>
    </form>
  );
}
