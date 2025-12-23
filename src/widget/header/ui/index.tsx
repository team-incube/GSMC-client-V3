"use client"

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { signout } from '@/feature/google-auth/lib/signout';
import Bell from '@/shared/asset/svg/Bell';
import Menu from '@/shared/asset/svg/Menu';
import AlertsModal from '@/widget/main/ui/AlertsModal';

import { HEADER_NAV } from '../config/navigation';
import MobileSidebar from './MobileSidebar';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 flex h-[70px] w-full items-center justify-center border-b border-gray-100 bg-white">
        <div className="flex w-full max-w-[1200px] items-center justify-between px-4 md:px-6 lg:w-150 lg:px-3">
          <Link href="/main" className="text-main-800 text-xl font-bold">
            GSMC
          </Link>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            {HEADER_NAV.map((item) => (
              <Link
                key={item.path}
                className={pathname === item.path ? 'font-semibold text-main-800' : 'text-gray-500'}
                href={item.path}
              >
                {item.label}
              </Link>
            ))}
            <button type="button" className="cursor-pointer font-semibold text-gray-900" onClick={signout}>
              로그아웃
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <Bell onClick={() => setIsModalOpen((prev) => !prev)} className="cursor-pointer" />
            <Menu onClick={() => setIsSidebarOpen(true)} className="cursor-pointer md:hidden" />
          </div>
        </div>
      </header>

      {isModalOpen ? (
        <div className="pointer-events-none fixed left-1/2 top-[70px] z-50 w-full max-w-[1200px] -translate-x-1/2 px-4 md:px-6 lg:w-150 lg:px-3">
          <div className="pointer-events-auto">
            <AlertsModal />
          </div>
        </div>
      ) : null}

      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
