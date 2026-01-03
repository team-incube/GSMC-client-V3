interface GetStudentCodeProps {
  grade: number;
  classNumber: number;
  number: number;
}

export default function getStudentCode({ grade, classNumber, number }: GetStudentCodeProps) {
  return `${String(grade)}${String(classNumber)}${String(number).padStart(2, '0')}`;
}
