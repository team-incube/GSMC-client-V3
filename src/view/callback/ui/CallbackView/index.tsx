'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function CallbackView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      axios.post('/api/auth/google/callback', { code })
        .then(() => {
          router.push('/main');
        })
        .catch((error) => {
          console.error('OAuth callback failed:', error);
          router.push('/signup');
        });
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
