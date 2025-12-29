import { StudentType } from '@/entities/student/model/student';
import getStudentCode from '@/shared/lib/getStudentCode';

interface SearchListProps {
  students: StudentType[];
  onRemove?: (studentId: number) => void;
}

const SearchList: React.FC<SearchListProps> = ({ students, onRemove }) => {
  if (students.length === 0) return null;

  return (
    <div className="mt-3">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">
        선택된 학생 ({students.length}명)
      </h3>
      <div className="flex flex-col gap-2">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {student.name}
              </span>
              <span className="text-xs text-gray-500 tabular-nums">
                {getStudentCode({ grade: student.grade, classNumber: student.classNumber, number: student.number })}
              </span>
            </div>
            {onRemove ? (
              <button
                type="button"
                onClick={() => onRemove(student.id)}
                className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 cursor-pointer"
              >
                삭제
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchList;
