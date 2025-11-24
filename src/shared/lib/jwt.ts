import { JWTPayload, jwtVerify } from 'jose';

import { RoleType } from '@/entities/student/model/student';

const getSecretKey = () => {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined in environment variables.');
  }
  return new TextEncoder().encode(secret);
};

interface RolePayload extends JWTPayload {
  role?: RoleType;
  sub?: string;
}

/**
 *
 * @param token
 * @returns
 */
export async function decodeTokenRole(token: string): Promise<RoleType | null> {
  const SECRET_KEY = getSecretKey();

  try {
    const { payload } = (await jwtVerify(token, SECRET_KEY)) as { payload: RolePayload };

    const userRole = payload.role;

    if (userRole) {
      return userRole;
    }

    return null;
  } catch {
    return null;
  }
}
