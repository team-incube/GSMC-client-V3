'use client';

import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { useActionState, useEffect } from 'react';

import { handleSignup } from '@/feature/google-auth/lib/handleSignup';
import { SignupFormState } from '@/feature/google-auth/model/SignupInitForm';
import { createInitialState } from '@/shared/lib/createInitialState';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(handleSignup, createInitialState<SignupFormState>());
  const router = useRouter()

  useEffect(() => {
    if (state.message) {
      if (state.status === "success") {
        toast.success(state.message);
        router.push("/")
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <form className="flex flex-col gap-9" action={formAction}>
      <div>
        <Input name="name" label="이름" placeholder="이름을 입력해주세요" />
        <small className="text-error pl-1">{state.fieldErrors?.name}</small>
      </div>
      <div>
        <Input
          label="학번"
          maxLength={4}
          minLength={4}
          placeholder="학번을 입력해주세요"
          type="number"
          name="studentNumber"
        />
        <small className="text-error pl-1">{state.fieldErrors?.studentNumber}</small>
      </div>
      <Button type="submit" disabled={isPending}>
        등록하기
      </Button>
    </form>
  );
}
