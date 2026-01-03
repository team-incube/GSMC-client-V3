'use client';

import { useState, useRef, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useScoreDisplay } from '@/shared/provider/ScoreDisplayProvider';
import { cn } from '@/shared/lib/cn';

export default function SettingDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, setMode } = useScoreDisplay();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignout = () => {
    router.push('/api/auth/logout');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'cursor-pointer font-semibold text-gray-500 transition-colors',
          isOpen && 'text-main-800',
        )}
      >
        설정
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-50 mt-2 w-56 transform overflow-hidden rounded-xl border border-gray-100 bg-white p-2">
          <div className="flex flex-col gap-1">
            <div className="px-3 py-2 text-xs font-bold text-gray-400">점수 표시 설정</div>

            {(['ACTUAL', 'PENDING', 'COMBINED'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors',
                  mode === m ? 'bg-main-50 text-main-800' : 'text-gray-500 hover:bg-gray-50',
                )}
              >
                {m === 'ACTUAL' && '실제'}
                {m === 'PENDING' && '예상'}
                {m === 'COMBINED' && '실제/예상(기본값)'}
              </button>
            ))}

            <div className="my-1 border-t border-gray-100" />

            <button
              type="button"
              onClick={handleSignout}
              className="text-error w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-red-50"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
