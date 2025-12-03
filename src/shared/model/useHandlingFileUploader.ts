import { useEffect, useState } from 'react';

import { FileType } from '@/entities/file/model/file';

interface FileUploaderProps {
  uploadedFiles?: FileType | FileType[];
  isMultiple?: boolean;
}

interface LocalFile {
  id: string;
  name: string;
  file: File;
}

export default function useFileUploaderState({ uploadedFiles, isMultiple }: FileUploaderProps) {
  const [existingFiles, setExistingFiles] = useState<FileType[]>([]);
  const [newFiles, setNewFiles] = useState<LocalFile[]>([]);

  useEffect(() => {
    if (!uploadedFiles) {
      setExistingFiles([]);
      return;
    }
    const normalizedFiles = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
    setExistingFiles(normalizedFiles);
  }, [uploadedFiles]);

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

  const buttonText = getButtonText();

  const displayFiles: FileType[] = [
    ...existingFiles,
    ...newFiles.map((file) => ({
      id: file.id,
      originalName: file.name,
      storeName: '',
      uri: '',
    })),
  ];

  return {
    existingFiles,
    newFiles,
    displayFiles,
    buttonText,
    handleFileChange,
    handleRemoveFile,
  };
}
