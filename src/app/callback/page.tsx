import CallbackView from '@/view/callback/ui/CallbackView';
import { Suspense } from 'react';

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
