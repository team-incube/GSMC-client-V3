'use client';

import { useEffect, useRef, useState } from 'react';
import React from 'react';

import { FileType } from '@/entities/file/model/file';
import { useAttachFile } from '@/entities/file/model/useAttachFile';
import { useRemoveFileById } from '@/entities/file/model/useRemoveFileById';
import Chain from '@/shared/asset/svg/Chain';

interface FileUploaderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  label: string;
  uploadedFiles?: FileType | FileType[];
  isMultiple?: boolean;
}

export default function FileUploader({
  label,
  uploadedFiles,
  name,
  isMultiple = false,
  ...props
}: FileUploaderProps) {

  const { mutate: attachFile, isPending } = useAttachFile();
  const { mutate: removeFile } = useRemoveFileById();

  const [files, setFiles] = useState<FileType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!uploadedFiles) {
      setFiles([]);
      return;
    }
    const normalizedFiles = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
    setFiles(normalizedFiles);
  }, [uploadedFiles]);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    if (!isMultiple) {
      const file = selectedFiles[0];
      attachFile({ file }, {
        onSuccess: (data) => {
          if (data?.id) {
            setFiles([data]);
          }
        },
      });
    }
    else {
      const fileArray = Array.from(selectedFiles);
      fileArray.forEach((file) => {
        attachFile({ file }, {
          onSuccess: (data) => {
            if (data?.id) {
              setFiles((prev) => {
                if (prev.some((f) => f.id === data.id)) {
                  return prev;
                }
                return [...prev, data];
              });
            }
          },
        });
      });
    }

    e.target.value = '';
  };

  const handleRemoveFile = (fileId: number) => {
    removeFile({ fileId }, {
      onSuccess: () => {
        setFiles((prev) => prev.filter((file) => file.id !== fileId));
      },
    });
  };

  const getButtonText = () => {
    if (isPending) return '업로드 중...';
    if (files.length === 0) return '파일 첨부';
    if (!isMultiple) return files[0]?.fileOriginalName || '파일 선택됨';
    return `${files.length}개의 파일 첨부됨`;
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <label className="text-body1 text-main-700">{label}</label>

        <div
          role="button"
          tabIndex={0}
          className={`focus:ring-main-500 flex ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'} items-center gap-2 rounded-xl border border-gray-300 p-3 hover:border-gray-300 focus:outline-none`}
          onClick={openFileDialog}
        >
          <span className="text-gray-400">
            <Chain />
          </span>
          <span
            className="max-w-[220px] truncate text-sm text-gray-400"
            title={getButtonText()}
          >
            {getButtonText()}
          </span>

          <input
            disabled={isPending}
            ref={inputRef}
            type="file"
            className="hidden"
            multiple={isMultiple}
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
            <span className="text-sm text-gray-700 truncate max-w-[80%]">{file.fileOriginalName}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile(file.id);
              }}
              className="text-xs text-red-500 hover:text-red-700 ml-2 cursor-pointer"
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      <div className="hidden">
        {files.map((file) => (
          file?.id ? (
            <input
              key={file.id}
              value={file.id}
              name={name}
              type="hidden"
              readOnly
            />
          ) : null
        ))}
      </div>
    </div>
  );
}