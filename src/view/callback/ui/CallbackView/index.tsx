'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CallbackView() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      fetch('/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
    }
  }, [code]);

  return <div>로그인 중...</div>;
}
