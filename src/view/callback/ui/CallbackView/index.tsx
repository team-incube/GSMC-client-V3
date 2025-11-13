'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { instance } from '@/shared/lib/axios';

export default function CallbackView() {
  const searchParams = useSearchParams();

  const code = searchParams.get('code');

  useEffect(() => {
    async function run() {
      try {
        if (code) {
          await instance.post('/auth', { "code": code });
        }
      } catch (e) {
        throw e;
      }
    }

    run();
  }, [code]);

  return null;
}
