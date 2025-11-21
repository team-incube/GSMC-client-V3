import { Suspense } from 'react';

import CallbackView from '@/view/callback/ui/CallbackView';

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">페이지 로딩 중...</p>
      </div>
    }>
      <CallbackView />
    </Suspense>
  );
}
