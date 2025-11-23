import Book from '@/shared/asset/svg/Book';
import File from '@/shared/asset/svg/File';
import Language from '@/shared/asset/svg/Language';
import People from '@/shared/asset/svg/People';
import Stars from '@/shared/asset/svg/Stars';
import Trophy from '@/shared/asset/svg/Trophy';

export const evaluationData = [
  {
    id: 1,
    icon: Book,
    title: '전공 영역',
    content: '전공 분야의 전문성과 기술 역량을 평가합니다',
  },
  {
    id: 2,
    icon: People,
    title: '인문 · 인성 영역',
    content: '인문학적 소양과 바른 인성을 평가합니다',
  },
  {
    id: 3,
    icon: Language,
    title: '외국어 영역',
    content: '글로벌 시대에 필요한 외국어 능력을 평가합니다',
  },
];

export const operateData = [
  {
    id: 1,
    icon: File,
    title: '포트폴리오 기반',
    content: '학생 개인별 활동을 기반으로\nGSMC 시스템과 연계하여 운영됩니다.',
  },
  {
    id: 2,
    icon: Stars,
    title: '학년 단위 평가 및 시상',
    content: '역량인증 내용을 성실하게 관리한\n학생을 평가하여 시상합니다.',
  },
  {
    id: 3,
    icon: Trophy,
    title: '자발적 참여 동기 부여',
    content: '학생들의 자발적 참여와 동기부여를\n통해 교육의 질을 향상시킵니다',
  },
];

export const operateorderData = [
  {
    id: 1,
    title: '인증제 수여',
    content: '일정 수준에 도달한 학생에게 공식 인증서를 수여합니다',
  },
  {
    id: 2,
    title: '학년별 시상',
    content: '성실하게 관리한 학생을 학년 단위로 평가하여 시상합니다',
  },
  {
    id: 3,
    title: '포트폴리오 구축',
    content: '학생 개인별 활동을 기반으로 GSMC 시스템과 연계하여 운영됩니다',
  },
  {
    id: 4,
    title: '진로 역량 강화',
    content: '전공, 인성, 외국어 능력을 고루 갖춘 인재로 성장합니다',
  },
];

export const scoreData = [
  {
    area: '점수',
    cumulative: '34점',
    year: '66점',
    total: '100점',
  },
];

export const cumulativeData = [
  {
    area: '자격증',
    content: '자격증 취득 (전공관련, 한국사(3급이상),\n한자어(3급이상))',
    score: '자격증 1개당 2점',
    note: '최대 14점',
    proof: '해당 자격증 인증서 첨부(*자격증 사이트 내)',
  },
  {
    area: 'TOPCIT',
    content: '취득점수',
    score: '100점당 1점 반올림',
    note: '최대 10점',
    proof: 'TOPCIT 인증서 첨부(*TOPCIT 사이트 내)',
  },
  {
    area: '공인 점수\n(토익사관학교\n참여 1점가산)',
    content: 'TOEIC, JLPT',
    score: '100점당 1점',
    note: '최대 10점',
    proof: 'TOEIC 성적표, JLPT 성적증명서 첨부\n(*YBM TOEIC 사이트 내, JLPT 사이트 내)',
  },
];

export const yearData = [
  {
    area: '독서활동',
    content: '빛고을독서마라톤',
    score: '코스별 1점\n(거북이, 악어, 토끼, 타조, 사자, 호랑이, 월계관)\n- 단계에 따라 1점 가산',
    note: '최대 7점',
    proof: '독서마라톤 코스 선택\n독서마라톤 완주증서 첨부',
  },
  {
    area: '봉사',
    content: '봉사 활동\n(교육과정 봉사활동 제외, 1365)',
    score: '시간당 1점',
    note: '최대 10점',
    proof: '담임 선생님이 입력',
  },
  {
    area: '직업기초 능력평가',
    content: '직업기초 평가 점수',
    score: '평균 등급 반올림',
    note: '최대 5점',
    proof: '영역별 등급 입력\n직기초 인증서 첨부\n(*Teenup 사이트 내)',
  },
  {
    area: '수상경력',
    content:
      '- 공문을 통한 전공분야 대회\n- 전공 분야 대회 개별 참여\n- 연합 해커톤\n- GSM Festival\n- 교내해커톤\n- 전공동아리 발표대회\n- 교내외 인성관련',
    score: '입상 1개당 1점',
    note: '최대 10점',
    proof: '파일 첨부',
  },
  {
    area: '뉴로우스쿨 참여',
    content: '참여 성실도',
    score: '회고온도 20점당 1점',
    note: '최대 5점',
    proof: '뉴로우 회고 온도 입력\n증빙 가능한 이미지 첨부\n(*뉴로우 사이트 내)',
  },
  {
    area: '교과성적',
    content: '평균등급 반올림',
    score: '등급 1 2 3 4 5 6 7 8 9\n점수 9 8 7 6 5 4 3 2 1',
    note: '최대 9점',
    proof: '담임 선생님이 입력',
  },
  {
    area: '프로젝트 참여',
    content: '프로젝트 참여 활동',
    score: '1회당 2점\n(2인이상 협업 해당, 팀장이 대표로 제출)',
    note: '최대 10점',
    proof: '글 작성',
  },
  {
    area: '외부 활동',
    content:
      '개인적인 외부활동 참가\n(컨퍼런스, 행사, 해커톤,\n대회 참가 등으로\n증빙서류가 있을 시 가능\n(확인증, 출입증 첨부시))',
    score: '1회당 1점',
    note: '최대 10점',
    proof: '파일 첨부',
  },
];
