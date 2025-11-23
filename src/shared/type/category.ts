export const Category = {
  VOLUNTEER: '봉사활동',
  TOPCIT: 'TOPCIT',
  TOEIC: 'TOEIC',
  READ_A_THON: '독서마라톤',
  PROJECT_PARTICIPATION: '프로젝트 참여',
  NEWRROW_SCHOOL: '뉴로우스쿨 참여',
  NCS: '직업기초능력평가',
  JLPT: 'JLPT',
  TOEIC_ACADEMY: '토익 사관학교',
  EXTERNAL_ACTIVITY: '외부활동',
  CERTIFICATE: '자격증',
  AWARD: '수상경력',
  ACADEMIC_GRADE: '교과성적',
} as const;

export type CategoryKey = keyof typeof Category;

export interface CategoryNames {
  englishName: string;
  koreanName: string;
}

export const CategoryEndpoint: Record<CategoryKey, string> = {
  VOLUNTEER: 'volunteer',
  TOPCIT: 'topcit',
  TOEIC: 'toeic',
  READ_A_THON: 'readathon',
  PROJECT_PARTICIPATION: 'project-participation',
  NEWRROW_SCHOOL: 'newrrow-school',
  NCS: 'ncs',
  JLPT: 'jlpt',
  TOEIC_ACADEMY: 'toeic-academy',
  EXTERNAL_ACTIVITY: 'external-activities',
  CERTIFICATE: 'certificates',
  AWARD: 'awards',
  ACADEMIC_GRADE: 'academic-grade',
};
