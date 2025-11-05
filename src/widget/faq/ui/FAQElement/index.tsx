'use client';

import ChevronDown from '@/shared/asset/svg/ChevronDown';
import { cn } from '@/shared/lib/cn';

interface FaqProps {
  title: string;
  content: string;
  keyword?: string;
  showContent: boolean;
  onToggle: () => void;
  isPageChanging?: boolean;
}

export default function FaqElement({
  title,
  content,
  keyword = '',
  showContent,
  onToggle,
  isPageChanging = false,
}: FaqProps) {
  const getHighlightedText = (text: string, keyword: string) => {
    if (!keyword) return text;
    let startIndex = 0;
    const result = [];
    result.push(text.substring(startIndex));
    return result;
  };

  return (
    <button
      className={cn(
        'flex',
        'w-full',
        'px-4',
        'py-3',
        'items-start',
        'bg-white',
        'border-t',
        'border-gray-200',
        'flex-col',
        'text-left',
      )}
      onClick={onToggle}
    >
      <div className={cn('flex', 'w-full', 'items-center', 'justify-between', 'gap-4')}>
        <p className={cn('text-[rgb(56,91,151)]', 'text-base', 'font-semibold', 'flex-1')}>
          {getHighlightedText(title, keyword)}
        </p>
        <div
          className={cn(
            'transition-transform',
            'duration-300',
            'flex-shrink-0',
            'cursor-pointer',
            showContent ? 'rotate-180' : 'rotate-0',
          )}
        >
          <ChevronDown />
        </div>
      </div>

      <div
        className={cn(
          'w-full',
          'overflow-hidden',
          'transition-all',
          'duration-300',
          'ease-in-out',
          `${isPageChanging ? 'transition-none' : ''}`,
          showContent ? 'mt-4 max-h-96' : 'max-h-0',
        )}
      >
        <div
          className={cn(
            'text-[rgb(56,91,151)]',
            'text-sm',
            'leading-relaxed',
            'whitespace-pre-wrap',
          )}
          dangerouslySetInnerHTML={{ __html: content?.replace(/\\"/g, '"') || '' }}
        />
      </div>
    </button>
  );
}
