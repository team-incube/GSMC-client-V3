import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import axios from 'axios';

import { RoleType, StudentType } from './entities/student/model/student';
import { AuthTokenType } from './feature/google-auth/model/auth';
import { PROTECT_PAGE, PUBLIC_PAGE } from './shared/config/protect-page';
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
  }

  if (!userRole && refreshToken) {
    try {
      const response = await axios.put<{ data: AuthTokenType }>(
        `${BACKEND_URL}/auth/refresh`,
        {},
        { headers: { Cookie: `refreshToken=${refreshToken}` } },
      );

      userRole = response?.data.data.role ?? null;

      const nextResponse = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

      if (isProtectedRoute) {
        if (!userRole) {
          const redirect = NextResponse.redirect(new URL('/', request.url));
          redirect.cookies.delete('accessToken');
          redirect.cookies.delete('refreshToken');
          return redirect;
        }
        if (userRole === 'UNAUTHORIZED') {
          const redirect = NextResponse.redirect(new URL('/signup', request.url));
          await setAuthCookies(newAccessToken, newRefreshToken, redirect);
          return redirect;
        }
      }

      if (isPublicRoute && userRole && userRole !== 'UNAUTHORIZED') {
        const redirect = NextResponse.redirect(new URL('/main', request.url));
        await setAuthCookies(newAccessToken, newRefreshToken, redirect);
        return redirect;
      }

      await setAuthCookies(newAccessToken, newRefreshToken, nextResponse);
      return nextResponse;

    } catch {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }
  }

  if (isProtectedRoute) {
    if (!userRole) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (userRole === 'UNAUTHORIZED') {
      return NextResponse.redirect(new URL('/signup', request.url));
    }
  }

  if (isPublicRoute) {
    if (userRole && userRole !== 'UNAUTHORIZED') {
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