'use client';

import React, { useEffect, useRef, useState } from 'react';

import { FileType } from '@/entities/file/model/file';
import Chain from '@/shared/asset/svg/Chain';
import FileList from '@/shared/ui/FileList';

interface FileUploaderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  label: string;
  uploadedFiles?: FileType | FileType[];
  isMultiple?: boolean;
}

interface LocalFile {
  id: string;
  name: string;
  file: File;
}

interface NewFileInputProps {
  file: File;
}

const NewFileInput = ({ file }: NewFileInputProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current && file) {
      const dt = new DataTransfer();
      dt.items.add(file);
      ref.current.files = dt.files;
    }
  }, [file]);

  return (
    <input
      ref={ref}
      type="file"
      name="newFiles"
      className="hidden"
      readOnly
    />
  );
};

export default function FileUploader({
  label,
  uploadedFiles,
  isMultiple = false,
  ...props
}: FileUploaderProps) {
  const [existingFiles, setExistingFiles] = useState<FileType[]>([]);
  const [newFiles, setNewFiles] = useState<LocalFile[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!uploadedFiles) {
      setExistingFiles([]);
      return;
    }
    const normalizedFiles = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
    setExistingFiles(normalizedFiles);
  }, [uploadedFiles]);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    if (!isMultiple) {
      const file = selectedFiles[0];
      setExistingFiles([]);
      setNewFiles([
        {
          id: crypto.randomUUID(),
          name: file.name,
          file: file,
        },
      ]);
    } else {
      const fileArray = Array.from(selectedFiles);
      const localFiles: LocalFile[] = fileArray.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        file: file,
      }));
      setNewFiles((prev) => [...prev, ...localFiles]);
    }

    e.target.value = '';
  };

  const handleRemoveFile = (id: number | string) => {
    if (typeof id === 'number') {
      setExistingFiles((prev) => prev.filter((file) => file.id !== id));
    } else {
      setNewFiles((prev) => prev.filter((file) => file.id !== id));
    }
  };

  const getButtonText = () => {
    const totalCount = existingFiles.length + newFiles.length;
    if (totalCount === 0) return '파일 첨부';

    if (!isMultiple) {
      if (newFiles.length > 0) return newFiles[0].name;
      if (existingFiles.length > 0) return existingFiles[0].originalName;
      return '파일 선택됨';
    }

    return `${totalCount}개의 파일 첨부됨`;
  };

  const displayFiles: FileType[] = [
    ...existingFiles,
    ...newFiles.map((f) => ({
      id: f.id,
      originalName: f.name,
      storeName: '',
      uri: '',
    })),
  ];

  return (
    <div>
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
            title={getButtonText()}
          >
            {getButtonText()}
          </span>

          <input
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

      <FileList files={displayFiles} onRemove={handleRemoveFile} />

      <div className="hidden">
        {existingFiles.map((file) => (
          <input
            key={`existing-${file.id}`}
            value={file.id}
            name="existingFileIds"
            type="hidden"
            readOnly
          />
        ))}

        {newFiles.map((localFile) => (
          <NewFileInput
            key={localFile.id}
            file={localFile.file}
          />
        ))}
      </div>
    </div>
  );
}