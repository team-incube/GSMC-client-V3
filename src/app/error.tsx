'use client'

import Button from '@/shared/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-6 px-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-3xl font-bold text-main-700">오류가 발생했습니다</h2>
        <p className="text-lg text-gray-600">{error.name}</p>
        <p className="text-gray-500">{error.message}</p>
      </div>
      <Button onClick={() => reset()} className="w-full max-w-[200px]">
        메인으로 돌아가기
      </Button>
    </div>

  )
}