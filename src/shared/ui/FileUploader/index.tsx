'use client';

import React from 'react';
import { useEffect, useRef, useState } from 'react';

import { FileType } from '@/entities/file/model/file';
import { useAttachFile } from '@/entities/file/model/useAttachFile';
import { useRemoveFileById } from '@/entities/file/model/useRemoveFileById';
import Chain from '@/shared/asset/svg/Chain';
import FileList from '@/shared/ui/FileList';
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

  const handleRemoveFile = (id: number) => {
    removeFile({ id }, {
      onSuccess: () => {
        setFiles((prev) => prev.filter((file) => file.id !== id));
      },
    });
  };

  const getButtonText = () => {
    if (isPending) return '업로드 중...';
    if (files.length === 0) return '파일 첨부';
    if (!isMultiple) return files[0]?.originalName || '파일 선택됨';
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

      <FileList files={files} onRemove={handleRemoveFile} />

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