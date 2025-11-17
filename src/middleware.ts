import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROTECT_PAGE, PUBLIC_PAGE } from './shared/config/protect-page';
import { decodeTokenRole } from './shared/lib/jwt';
import { RoleType } from './entities/student/model/StudentSchema';

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

  const hasAccessToken = request.cookies.has('accessToken');
  const accessToken = request.cookies.get('accessToken')?.value;
  let userRole: RoleType | null = null;

  if (accessToken) {
    userRole = await decodeTokenRole(accessToken); // 👈 수정 완료!
    // 이제 userRole에는 디코딩된 'ADMIN', 'USER', 또는 'null'이 들어갑니다.
    console.log('Middleware User Role:', userRole);
  }

  if (!hasAccessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (hasAccessToken && userRole === 'UNAUTHORIZED' && isProtectedRoute) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  if (hasAccessToken && userRole !== 'UNAUTHORIZED' && isPublicRoute) {
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
