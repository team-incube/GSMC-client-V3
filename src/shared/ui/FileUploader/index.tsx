'use client';

import Chain from '@/shared/asset/svg/Chain';
import { useAttachFile } from '@/shared/model/useAttachFile';
import { useRef, useState, type InputHTMLAttributes } from 'react';

interface FileUploaderProps {
  label?: string;
}

type Props = FileUploaderProps & InputHTMLAttributes<HTMLInputElement>;

export default function FileUploader({ label = '이미지', ...props }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { attachFile, loading } = useAttachFile();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
    if (file)
      attachFile(file, {
        onError: () => {
          setFileName(null);
          if (inputRef.current) inputRef.current.value = '';
        },
      });
  };

  const openFileDialog = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-body1 text-main-700">{label}</label>
      <div
        role="button"
        tabIndex={0}
        className="focus:ring-main-500 flex cursor-pointer items-center gap-2 rounded-xl border border-gray-300 p-3 hover:border-gray-300 focus:outline-none"
        onClick={openFileDialog}
      >
        <span className="text-gray-400">
          <Chain />
        </span>
        <span
          className="max-w-[220px] truncate text-sm text-gray-400"
          aria-live="polite"
          title={fileName ?? undefined}
        >
          {loading ? '파일 업로드 중...' : (fileName ?? '파일 첨부')}
        </span>
        <input
          disabled={loading}
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          {...props}
        />
      </div>
    </div>
  );
}
