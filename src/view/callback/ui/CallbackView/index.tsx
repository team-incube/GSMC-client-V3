'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function CallbackView() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');

    const run = async () => {
      try {
        console.log('Authorization code:', code);
        const res = await axios.post('/api/auth/google/callback', { code });
        console.log('API Response:', res.data);

        // ✅ role 판단: UNAUTHORIZED면 회원가입, 아니면 메인으로
        if (res.data.needsSignup) {
          console.log('신규 사용자 → 회원가입 페이지로');
          router.push('/signup');
        } else {
          console.log('기존 사용자 → 메인 페이지로');
          router.push('/main');
        }
      } catch (error) {
        console.error('OAuth callback failed:', error);
        // 실패 시 인트로 페이지로
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
