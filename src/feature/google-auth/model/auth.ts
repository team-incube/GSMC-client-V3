import { RoleType } from '@/entities/student/model/student';

export interface AuthTokenType {
  data: {
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
    role: RoleType;
  };
}
