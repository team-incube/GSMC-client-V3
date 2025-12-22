'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { StudentType } from '@/entities/student/model/student';
import { useGetSearchStudent } from '@/entities/student/model/useGetSearchStudent';
import getStudentCode from '@/shared/lib/getStudentCode';
import SearchBar from '@/shared/ui/SearchBar';
import SearchList from '@/shared/ui/SearchList';

interface SearchDropdownProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label: string;
  name?: string;
  selectedStudents?: StudentType | StudentType[];
  onChange?: (students: StudentType[]) => void;
}

export default function SearchDropdown({ label, name, selectedStudents, onChange, ...props }: SearchDropdownProps) {
  const [keyword, setKeyword] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { data: searchResults = [], isLoading } = useGetSearchStudent({ name: keyword, page: 0, limit: 10 })

  const [students, setStudents] = useState<StudentType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!selectedStudents) {
      setStudents([]);
      return;
    }
    const normalizedStudents = Array.isArray(selectedStudents) ? selectedStudents : [selectedStudents];
    setStudents(normalizedStudents);
  }, [selectedStudents]);

  const handleSearchChange = (value: string) => {
    setKeyword(value);
  };

  const handleValueChange = (value: string) => {
    setInputValue(value);
    if (value.trim().length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectStudent = (student: StudentType) => {
    if (students.some((s) => s.id === student.id)) {
      toast.warning('이미 추가된 학생입니다.');
      return;
    }

    const newStudents = [...students, student];
    setStudents(newStudents);
    onChange?.(newStudents);
    setInputValue('');
    setKeyword('');
    setShowDropdown(false);
  };

  const handleRemoveStudent = (id: number) => {
    const newStudents = students.filter((student) => student.id !== id);
    setStudents(newStudents);
    onChange?.(newStudents);
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-1">
        <label className="text-body1 text-main-700 font-medium">{label}</label>

        <div className="relative">
          <SearchBar
            value={inputValue}
            onSearchChange={handleSearchChange}
            onValueChange={handleValueChange}
            placeholder="학생 이름을 검색하세요"
            onFocus={() => inputValue.trim().length > 0 && setShowDropdown(true)}
            {...props}
          />

          {showDropdown ? <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-3 text-center text-sm text-gray-500">검색 중...</div>
            ) : searchResults.length > 0 ? (
              <ul>
                {searchResults.map((student) => (
                  <li
                    key={student.id}
                    onClick={() => handleSelectStudent(student)}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex justify-between items-center"
                  >
                    <span>
                      {student.name}
                    </span>
                    <span className='tabular-nums'>
                      {getStudentCode({ grade: student.grade, classNumber: student.classNumber, number: student.number })}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-3 text-center text-sm text-gray-500">
                검색 결과가 없습니다.
              </div>
            )}
          </div> : null}
        </div>
      </div>

      <hr className="mt-6 mb-8 border-gray-100" />

      <SearchList students={students} onRemove={handleRemoveStudent} />

      <div className="hidden">
        {students.map((student) => (
          <input
            key={student.id}
            type="hidden"
            name={name}
            value={student.id}
            readOnly
          />
        ))}
      </div>
    </div>
  );
}