import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { AuthTokenResponse } from '@/feature/google-auth/model/AuthResponse';

export async function POST(request: NextRequest) {
  try {
    // 요청 바디에서 authorization code 추출
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
    }

    // 백엔드 API 호출 - 디코딩된 code 전송
    const response = await axios.post<AuthTokenResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth`,
      { code },
    );

    // 토큰과 역할 추출
    const { accessToken, refreshToken, role } = response.data.data;

    // 토큰이 없으면 오류 반환
    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: '토큰을 받지 못했습니다' }, { status: 500 });
    }

    const res = NextResponse.json(
      {
        success: true,
        needsSignup: role === 'UNAUTHORIZED',
      },
      { status: 200 },
    );

    // 쿠키에 토큰 저장
    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'lax',
    });

    // 쿠키에 refreshToken도 저장
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
