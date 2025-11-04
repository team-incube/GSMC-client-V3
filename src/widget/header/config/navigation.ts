import { ROUTES } from '@/shared/config/routes';

export const HEADER_NAV = [
  { label: '인증제란?', path: ROUTES.HOME },
  { label: '자주 묻는 질문', path: ROUTES.FAQ },
  { label: '새 글 작성', path: ROUTES.WRITE },
  { label: '마이페이지', path: ROUTES.MYPAGE}
] as const;
