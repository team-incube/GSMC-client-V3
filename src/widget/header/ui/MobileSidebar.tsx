'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import Close from '@/shared/asset/svg/Close';
import { useScoreDisplay } from '@/shared/provider/ScoreDisplayProvider';
import { cn } from '@/shared/lib/cn';

import { HEADER_NAV } from '../config/navigation';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, setMode } = useScoreDisplay();

  const handleSignout = () => {
    router.push('/api/auth/logout');
  };

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden"
          onClick={onClose}
        />
      ) : null}

      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-[280px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <Link href="/main" className="text-main-800 text-xl font-bold" onClick={onClose}>
            GSMC
          </Link>
          <button type="button" onClick={onClose} className="cursor-pointer" aria-label="메뉴 닫기">
            <Close />
          </button>
        </div>

        <div className="flex h-[calc(100%-65px)] flex-col justify-between">
          <div className="overflow-y-auto">
            <nav className="flex flex-col gap-2 p-4">
              <div className="mb-1 px-4 text-xs font-bold text-gray-400">메뉴</div>
              {HEADER_NAV.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    'rounded-lg px-4 py-3 text-sm transition-colors',
                    pathname === item.path
                      ? 'bg-main-50 text-main-800 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50',
                  )}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-gray-100 p-4">
              <div className="mb-2 px-4 text-xs font-bold text-gray-400">점수 표시 설정</div>
              <div className="flex flex-col gap-1">
                {(['ACTUAL', 'PENDING', 'COMBINED'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={cn(
                      'w-full cursor-pointer rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
                      mode === m ? 'bg-main-50 text-main-800' : 'text-gray-500 hover:bg-gray-50',
                    )}
                  >
                    {m === 'ACTUAL' && '실제'}
                    {m === 'PENDING' && '예상'}
                    {m === 'COMBINED' && '실제/예상(기본값)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4">
            <button
              type="button"
              className="text-error w-full cursor-pointer rounded-lg bg-gray-50 px-4 py-3 text-left text-sm font-semibold hover:bg-red-50"
              onClick={handleSignout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
