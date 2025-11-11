import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps {
  label?: string;
}

type Props = TextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ label = '내용', ...props }: Props) {
  return (
    <div>
      <label className="text-body1 text-main-700" htmlFor={label}>
        {label}
      </label>
      <textarea
        className="w-full resize-none rounded-2xl border border-gray-300 p-[20px]"
        id={label}
        {...props}
      />
    </div>
  );
}
