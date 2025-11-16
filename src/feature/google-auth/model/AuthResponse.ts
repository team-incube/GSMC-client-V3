/**
 * 구글 OAuth 인증 응답 타입
 */
export interface AuthTokenResponse {
  data:{
    accessToken: string;
    accessTokenExpiresAt: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
    role: 'UNAUTHORIZED' | 'STUDENT' |'TEACHER' | 'ROOT';
  }
}
