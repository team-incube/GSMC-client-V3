import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/shared/lib/query';

export const metadata: Metadata = {
  title: 'GSMC',
  description:
    'GSMC 프로젝트는 GSM Certification의 약자로 GSM 인증제라는 뜻을 가지고 있습니다. 쓰기 복잡하고 점수관리가 어렵던 GSM 인증제를 선생님과 학생들 모두 더욱 더 쉽고 간편하게 웹사이트에서 관리하기 위해 개발하고 있는 프로젝트입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
