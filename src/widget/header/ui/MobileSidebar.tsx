'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { signout } from '@/feature/google-auth/lib/signout';
import Close from '@/shared/asset/svg/Close';

import { HEADER_NAV } from '../config/navigation';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen ? <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        /> : null}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-64 bg-white shadow-lg transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-100 p-4">
            <span className="text-main-800 text-lg font-bold">메뉴</span>
            <button type="button" onClick={onClose} className="cursor-pointer" aria-label="메뉴 닫기">
              <Close />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {HEADER_NAV.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`rounded-lg px-4 py-3 ${
                  pathname === item.path
                    ? 'bg-main-50 font-semibold text-main-800'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-gray-100 p-4">
            <button
              type="button"
              className="w-full rounded-lg px-4 py-3 text-left font-semibold text-gray-900 hover:bg-gray-50"
              onClick={() => {
                signout();
                onClose();
              }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </>
  );
}