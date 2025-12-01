import { useState } from 'react';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  options: string[] | DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  name?: string;
}

const Dropdown = ({ label, options, value, onChange, className, name }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const normalizedOptions: DropdownOption[] = options.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option
  );

  const displayLabel = normalizedOptions.find((opt) => opt.value === value)?.label || value;

  return (
    <div className={`relative ${className ?? ''}`}>
      {label ? <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label> : null}
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-200 rounded-lg text-left text-sm cursor-pointer"
      >
        <span>{displayLabel}</span>
        <span className="text-gray-400">▼</span>
      </button>
      {isOpen ? <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        {normalizedOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm cursor-pointer hover:bg-gray-50"
          >
            {option.label}
          </button>
        ))}
      </div> : null}
    </div>
  );
};

export default Dropdown;
