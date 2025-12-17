import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import axios from 'axios';

import { RoleType, StudentType } from './entities/student/model/student';
import { AuthTokenType } from './feature/google-auth/model/auth';
import { PROTECT_PAGE, PUBLIC_PAGE } from './shared/config/protect-page';
import { deleteAuthCookies } from './shared/lib/cookie/deleteCookie';
import { setAuthCookies } from './shared/lib/cookie/setAuthCookie';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const currentPath = request.nextUrl.pathname;

  const isProtectedRoute = PROTECT_PAGE.includes(currentPath);
  const isPublicRoute = PUBLIC_PAGE.includes(currentPath);

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let userRole: RoleType | null = null;

  if (accessToken) {
    try {
      const response = await axios.get<{ data: StudentType }>(`${BACKEND_URL}/members/my`, {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      });
      userRole = response.data.data.role;
    } catch {
      userRole = null;
    }
  } else if (refreshToken) {
    try {
      const response = await axios.put<{ data: AuthTokenType }>(
        `${BACKEND_URL}/auth/refresh`,
        {},
        { headers: { Cookie: `refreshToken=${refreshToken}` } },
      );
      await setAuthCookies(response.data.data.accessToken, response.data.data.refreshToken);
      userRole = response?.data.data.role ?? null;
      newTokens = response?.data?.data ?? null;
    } catch {
      await deleteAuthCookies();
      return NextResponse.redirect(new URL('/', request.url));
    }
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

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};
