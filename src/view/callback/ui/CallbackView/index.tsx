'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

export default function CallbackView() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');

    const run = async () => {
      try {
        const res = await axios.post('/api/auth/google/callback', { code });

        if (res.data.needsSignup) {
          toast.success('환영합니다! 회원가입을 완료해주세요.');
          router.push('/signup');
        } else {
          toast.success('로그인 성공');
          router.push('/main');
        }
      } catch (error) {
        toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
        router.push('/');
      }
    };

    if (code) {
      run();
    } else {
      console.error('No authorization code found');
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-gray-600">로그인 진행 중...</p>
      </div>
    </div>
  );
}
