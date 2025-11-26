import { JWTPayload, jwtVerify } from 'jose';

import { RoleType } from '@/entities/student/model/student';

interface RolePayload extends JWTPayload {
  role?: RoleType;
  sub?: string;
}

export async function decodeToken(token: string): Promise<RolePayload | null> {
  const SECRET_KEY = new TextEncoder().encode(process.env.JWT_ACCESS_TOKEN_SECRET);

  try {
    const { payload } = (await jwtVerify(token, SECRET_KEY)) as { payload: RolePayload };

    return payload;
  } catch {
    return null;
  }
}
