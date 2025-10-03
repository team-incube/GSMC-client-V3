import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const currentPath = request.nextUrl.pathname;

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

  if (
    currentPath.startsWith('/_next') ||
    currentPath.startsWith('/favicon') ||
    currentPath.includes('.')
  ) {
    return NextResponse.next();
  }

  const hasAccessToken = request.cookies.has('accessToken');
  const hasRefreshToken = request.cookies.has('refreshToken');

  const isProtectedPage = ['/main'].some((path: string) => currentPath.startsWith(path));
  const isAuthPage = ['/intro', '/signup'].some((path: string) => currentPath.startsWith(path));

  if (!hasAccessToken && isProtectedPage) {
    if (hasRefreshToken) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } else {
      return NextResponse.redirect(new URL('/intro', request.url));
    }
  }

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
    '/((?!_next/static|_next/image|favicon.ico|.*\.(png|jpg|jpeg|gif|svg)).*)',
  ],
};
