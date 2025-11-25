import { useState } from 'react';

import ChevronDown from '@/shared/asset/svg/ChevronDown';

interface AccordianProps {
  title?: string;
  subTitle?: string;
  children: React.ReactNode
}

export function Accordian({ title = "", subTitle = "", children }: AccordianProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border border-gray-200 rounded-lg bg-white overflow-hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium mb-1">{subTitle}</span>
          <h2 className="text-lg font-bold text-gray-800">
            {title}
          </h2>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="p-4 border-t border-gray-100 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
