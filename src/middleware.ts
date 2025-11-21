import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { RoleType } from './entities/student/model/StudentSchema';
import { PROTECT_PAGE, PUBLIC_PAGE } from './shared/config/protect-page';
import { decodeTokenRole } from './shared/lib/jwt';


export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = PROTECT_PAGE.includes(currentPath);
  const isPublicRoute = PUBLIC_PAGE.includes(currentPath);

  // API 요청인 경우 - Route Handler는 쿠키에 직접 접근 가능하므로 그냥 통과
  if (currentPath.startsWith('/api')) {
    return NextResponse.next();
  }

  // 정적 파일 및 Next.js 내부 경로는 무시
  if (
    currentPath.startsWith('/_next') ||
    currentPath.startsWith('/favicon') ||
    currentPath.includes('.')
  ) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  let userRole: RoleType | null = null;

  if (accessToken) {
    userRole = await decodeTokenRole(accessToken);
  }

  if (isProtectedRoute) {
    if (!userRole) {
      // 토큰이 없거나 유효하지 않으면 로그인 페이지로 리디렉션
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (userRole === 'UNAUTHORIZED') {
      // 회원가입이 완료되지 않았으면 회원가입 페이지로 리디렉션
      return NextResponse.redirect(new URL('/signup', request.url));
    }
  }

  if (isPublicRoute) {
    if (userRole && userRole !== 'UNAUTHORIZED') {
      // 로그인 및 회원가입이 완료된 사용자가 공개 페이지 접근 시 메인 페이지로 리디렉션
      return NextResponse.redirect(new URL('/main', request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
