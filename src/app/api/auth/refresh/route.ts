import { AuthTokenResponse } from '@/feature/google-auth/model/AuthResponse';
import { instance } from '@/shared/lib/axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  try {
    // 서버에서 refreshToken 읽기
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    // 백엔드에 토큰 갱신 요청
    const response = await instance.put<AuthTokenResponse>(`/auth/refresh`, { refreshToken });

    if (response.status !== 200) {
      throw new Error('Token refresh failed');
    }

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    // 새 accessToken 저장
    cookieStore.set('accessToken', accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1시간
      path: '/',
    });

    // refreshToken도 갱신되는 경우
    if (newRefreshToken) {
      cookieStore.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7일
        path: '/',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // 갱신 실패 시 쿠키 삭제
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
