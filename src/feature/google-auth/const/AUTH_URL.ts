/**
 * @deprecated 선언되었으나 사용되지 않음.
 */
export const GOOGLE_SIGNUP_URL = `
https://accounts.google.com/o/oauth2/v2/auth?
response_type=code
&scope=openid%20email
&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_SIGNUP_REDIRECT_URI}
`;

/**
 * @deprecated 선언되었으나 사용되지 않음.
 */
export const GOOGLE_SIGNIN_URL = `
https://accounts.google.com/o/oauth2/v2/auth?
response_type=code
&scope=openid%20email
&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_SIGNIN_REDIRECT_URI}
&prompt=consent
`;
