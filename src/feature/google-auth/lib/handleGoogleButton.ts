const GOOGLE_SIGNIN_URL = process.env.NEXT_PUBLIC_GOOGLE_SIGNIN_REDIRECT_URI as string;

export const handleGoogleButton = () => {
  window.location.href = GOOGLE_SIGNIN_URL;
};
