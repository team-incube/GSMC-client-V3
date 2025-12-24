import { cookies } from 'next/headers';

export async function deleteAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete({
    name: 'accessToken',
    path: '/',
  });
  cookieStore.delete({
    name: 'refreshToken',
    path: '/',
  });
}
