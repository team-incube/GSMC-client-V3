'use client';

import Search from "@/shared/asset/svg/Search";
import React, { useEffect, useState } from "react";
import { useDebouncedValue } from "@/shared/model/useDebouncedValue";

interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearchChange?: (value: string) => void;
  debounceDelay?: number;
}

export default function SearchBar({ onSearchChange, debounceDelay = 500, placeholder = "찾는 내 글을 검색해주세요", value, ...props }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value ?? '');
  const debouncedValue = useDebouncedValue(inputValue, debounceDelay);

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  useEffect(() => {
    onSearchChange?.(String(debouncedValue));
  }, [debouncedValue, onSearchChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex justify-between items-center w-full px-4 py-3 rounded-[10px] bg-white border border-gray-200">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        value={inputValue}
        className="flex-grow outline-none text-base text-gray-700 placeholder:text-[#a5a6a9]"
        autoComplete="off"
        {...props}
      />
      <Search />
    </div>
  )
}

