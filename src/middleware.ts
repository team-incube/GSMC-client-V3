import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const currentPath = request.nextUrl.pathname;

  // API 요청인 경우
  if (currentPath.startsWith('/api')) {
    requestHeaders.set('x-custom-header', 'api-request');

    const accessToken = request.cookies.get('accessToken');

    if (accessToken) {
      requestHeaders.set('Authorization', `Bearer ${accessToken.value}`);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 정적 파일 및 Next.js 내부 경로는 무시
  if (
    currentPath.startsWith('/_next') ||
    currentPath.startsWith('/favicon') ||
    currentPath.includes('.')
  ) {
    return NextResponse.next();
  }

  const hasAccessToken = request.cookies.has('accessToken');
  const hasRefreshToken = request.cookies.has('refreshToken');
  const userRole = request.cookies.get('userRole')?.value;

  const isProtectedPage = ['/main'].some((path: string) => currentPath.startsWith(path));
  
  // ✅ 인증 페이지: 인트로만 포함 (회원가입은 토큰 있어도 접근 가능)
  const isAuthPage = currentPath === '/';
  const isSignupPage = currentPath === '/signup';
  const isCallbackPage = currentPath.startsWith('/callback');

  // ✅ callback 페이지는 인증 체크 스킵 (OAuth 처리 중)
  if (isCallbackPage) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // ✅ UNAUTHORIZED 사용자가 보호된 페이지 접근 시 회원가입으로, 나중에 사용자 정보 호출 API로 변경 예정
  if (hasAccessToken && userRole === 'UNAUTHORIZED' && isProtectedPage) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  // ✅ 회원가입 완료한 사용자가 회원가입 페이지 접근 시 메인으로, 나중에 사용자 정보 호출 API로 변경 예정
  if (hasAccessToken && userRole !== 'UNAUTHORIZED' && isSignupPage) {
    return NextResponse.redirect(new URL('/main', request.url));
  }

  // 토큰이 없지만 보호된 페이지에 접근하려는 경우
  if (!hasAccessToken && isProtectedPage) {
    if (hasRefreshToken) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 토큰이 있는데 인증 페이지에 접근하려는 경우
  if (hasAccessToken && isAuthPage) {
    return NextResponse.redirect(new URL('/main', request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)).*)',
  ],
};
