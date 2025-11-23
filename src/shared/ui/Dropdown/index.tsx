import React, { useState } from 'react';

interface DropdownProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className ?? ''}`}>
      {label ? <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label> : null}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-200 rounded-lg text-left text-sm"
      >
        <span>{value}</span>
        <span className="text-gray-400">▼</span>
      </button>
      {isOpen ? <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
          >
            {option}
          </button>
        ))}
      </div> : null}
    </div>
  );
};

export default Dropdown;
