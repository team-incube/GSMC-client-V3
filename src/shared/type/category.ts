export const Category = {
  volunteer: '봉사활동',
  topcit: 'TOPCIT',
  toeic: 'TOEIC',
  readathon: '독서마라톤',
  'project-participation': '프로젝트 참여',
  'nerrow-school': '뉴로우스쿨 참여',
  ncs: '직업기초능력평가',
  jlpt: 'JLPT',
  'external-activities': '외부활동',
  certificates: '자격증',
  awards: '수상경력',
  'academic-grade': '교과성적',
} as const;

export type CategoryKey = keyof typeof Category;
