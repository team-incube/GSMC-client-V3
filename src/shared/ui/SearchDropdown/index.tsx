'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { StudentType } from '@/entities/student/model/StudentSchema';
import Search from '@/shared/asset/svg/Search';
import { useGetSearchStudent } from '@/entities/student/model/useGetSearchStudent';

interface SearchDropdownProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function SearchDropdown({ label, name, ...props }: SearchDropdownProps) {
  const [keyword, setKeyword] = useState('');
  const { data: searchResults = [], isLoading } = useGetSearchStudent({ name: keyword, page: 0, limit: 10 })

  const [students, setStudents] = useState<StudentType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

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

    setStudents((prev) => [...prev, student]);
    setKeyword('');
    setShowDropdown(false);
  };

  const handleRemoveStudent = (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col gap-1">
        <label className="text-body1 text-main-700 font-medium">{label}</label>

        <div className="relative">
          <div className="focus-within:ring-main-500 flex items-center gap-2 rounded-xl border border-gray-300 p-3 focus-within:border-main-500">
            <span className="text-gray-400">
              <Search />
            </span>
            <input
              type="text"
              value={keyword}
              onChange={handleSearchChange}
              placeholder="학생 이름을 검색하세요"
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
              autoComplete="off"
              onFocus={() => keyword && setShowDropdown(true)}
              {...props}
            />
          </div>

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
                    <span>
                      {student.grade}{student.classNumber}{String(student.number).padStart(2, "0")}
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

      <div className="mt-3">
        {students.length > 0 && (
          <h3 className="text-sm font-semibold mb-2 text-gray-700">
            선택된 학생 ({students.length}명)
          </h3>
        )}
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
                <span className="text-xs text-gray-500">
                  {student.grade}{student.classNumber}{String(student.number).padStart(2, "0")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveStudent(student.id)}
                className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>

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