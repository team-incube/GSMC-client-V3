import { GoogleOAuthProvider } from '@react-oauth/google';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Toaster } from 'sonner';

import { QueryProvider } from '@/shared/lib/query';

import { ScoreDisplayProvider } from '@/shared/provider/ScoreDisplayProvider';

import './globals.css';

const pretendard = localFont({
  src: '../shared/asset/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'GSMC',
  description: 'GSMC는 GSM 인증제를 전산화하여 학생의 참여를 돕는 웹 기반 통합 플랫폼입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body>
        <GoogleOAuthProvider clientId={String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)}>
          <QueryProvider>
            <ScoreDisplayProvider>
              {children}
              <Toaster richColors position="top-right" />
            </ScoreDisplayProvider>
          </QueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
