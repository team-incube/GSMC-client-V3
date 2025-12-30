'use client';
import { useGoogleLogin } from '@react-oauth/google';

import Image from 'next/image';

import LogoImage from '@/shared/asset/img/logo.png';
import GoogleLogo from '@/shared/asset/svg/GoogleLogo';
import Button from '@/shared/ui/Button';

export default function IntroView() {
  const signin = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: "redirect",
    redirect_uri: String(process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI),
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-around px-4 py-8 sm:px-6 md:px-8 lg:py-12">
      <Image
        alt="GSMC logo"
        src={LogoImage}
        width={408}
        height={408}
        className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[408px] xl:h-[408px]"
      />
      <div className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
        <Button onClick={signin} variant="disabled_border">
          <GoogleLogo />
          <span className="ml-4 sm:ml-6 text-sm sm:text-base">Google로 시작하기</span>
        </Button>
      </div>
    </div>
  );
}