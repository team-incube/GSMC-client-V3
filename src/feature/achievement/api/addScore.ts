import { instance } from '@/shared/lib/instance';

// 1. 봉사활동 영역 점수 추가
export const addVolunteerScore = async (hours: number) => {
  const response = await instance.post('/scores/volunteer', {
    hours,
  });
  return response.data;
};

// 2. TOPCIT 영역 점수 추가
export const addTopcitScore = async (value: number, fileId: number) => {
  const response = await instance.post('/scores/topcit', {
    value,
    fileId,
  });
  return response.data;
};

// 3. TOEIC 영역 점수 추가
export const addToeicScore = async (value: number, fileId: number) => {
  const response = await instance.post('/scores/toeic', {
    value,
    fileId,
  });
  return response.data;
};

// 4. 독서마라톤 영역 점수 추가
export const addReadathonScore = async (grade: number, fileId: number) => {
  const response = await instance.post('/scores/readathon', {
    grade,
    fileId,
  });
  return response.data;
};

// 5. 프로젝트 참여 영역 점수 추가 (기존 예시)
export const addProjectScore = async (projectId: number) => {
  const response = await instance.post('/scores/project-participation', {
    projectId,
  });
  return response.data;
};

// 6. 뉴로우스쿨 참여 영역 점수 추가
export const addNewrrowSchoolScore = async (temperature: number, fileId: number) => {
  const response = await instance.post('/scores/newrrow-school', {
    temperature,
    fileId,
  });
  return response.data;
};

// 7. 직업기초능력평가(NCS) 영역 점수 추가
export const addNcsScore = async (averageScore: number, fileId: number) => {
  const response = await instance.post('/scores/ncs', {
    averageScore,
    fileId,
  });
  return response.data;
};

// 8. JLPT 영역 점수 추가
export const addJlptScore = async (grade: number, fileId: number) => {
  const response = await instance.post('/scores/jlpt', {
    grade,
    fileId,
  });
  return response.data;
};

// 9. 외부활동 영역 점수 추가
export const addExternalActivityScore = async (activityName: string, fileId: number) => {
  const response = await instance.post('/scores/external-activities', {
    activityName,
    fileId,
  });
  return response.data;
};

// 10. 자격증 영역 점수 추가
export const addCertificateScore = async (certificateName: string, fileId: number) => {
  const response = await instance.post('/scores/certificates', {
    certificateName,
    fileId,
  });
  return response.data;
};

// 11. 수상경력 영역 점수 추가
export const addAwardScore = async (awardName: string, fileId: number) => {
  const response = await instance.post('/scores/awards', {
    awardName,
    fileId,
  });
  return response.data;
};

// 12. 교과성적 영역 점수 추가
export const addAcademicGradeScore = async (averageGrade: number) => {
  const response = await instance.post('/scores/academic-grade', {
    averageGrade,
  });
  return response.data;
};
