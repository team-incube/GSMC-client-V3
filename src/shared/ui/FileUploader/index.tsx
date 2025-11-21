'use client';

import { useRef,useState } from 'react';
import React from 'react';

import Chain from '@/shared/asset/svg/Chain';
import { useAttachFile } from '@/shared/model/useAttachFile';

interface FileUploaderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FileUploader({ label, name, ...props }: FileUploaderProps) {
  const { attachFile, loading, uploadedFileIds, removeFileId } = useAttachFile();
  const [files, setFiles] = useState<Array<{ id: number; name: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    for (const file of Array.from(selectedFiles)) {
      attachFile(file, {
        onSuccess: (data) => {
          if (data?.id) {
            setFiles((prev) => [...prev, { id: data.id, name: file.name }]);
          }
        },
      });
    }
    e.target.value = '';
  };

  const handleRemoveFile = (id: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
    removeFileId(id);
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <label className="text-body1 text-main-700">{label}</label>
        <div
          role="button"
          tabIndex={0}
          className={`focus:ring-main-500 flex ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} items-center gap-2 rounded-xl border border-gray-300 p-3 hover:border-gray-300 focus:outline-none`}
          onClick={openFileDialog}
        >
          <span className="text-gray-400">
            <Chain />
          </span>
          <span
            className="max-w-[220px] truncate text-sm text-gray-400"
            aria-live="polite"
            title={loading ? '파일 업로드 중...' : `${files.length}개의 파일 첨부됨`}
          >
            {loading ? '파일 업로드 중...' : (files.length > 0 ? `${files.length}개의 파일 첨부됨` : '파일 첨부')}
          </span>
          <input
            disabled={loading}
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            {...props}
          />
        </div>
      </div>

      <hr className="mt-6 mb-8" />

      <div className="mt-3">
        {files.length > 0 && <h3 className="text-sm font-semibold mb-2">첨부 파일 목록</h3>}
        {files.map((file) => (
          <div className="flex justify-between items-center py-1 border-b border-gray-100" key={file.id}>
            <span className="text-sm text-gray-700 truncate max-w-[80%]">{file.name}</span>
            <button
              type="button"
              onClick={() => handleRemoveFile(file.id)}
              className="text-xs text-red-500 hover:text-red-700 ml-2 cursor-pointer"
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      <div className="hidden">
        {uploadedFileIds.map((id) => (
          <input
            key={id}
            type="hidden"
            name={name}
            value={id}
            readOnly
          />
        ))}
      </div>
    </div>
  );
}