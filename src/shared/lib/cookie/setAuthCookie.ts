import { cookies } from 'next/headers';

export async function setAuthCookies(accessToken: string, refreshToken?: string | null) {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60,
    path: '/',
    sameSite: 'lax',
  });

  if (refreshToken) {
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    });
  }
}
