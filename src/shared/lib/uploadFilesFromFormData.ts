'use server';

import { attachFile } from '@/entities/file/api/attachFile';

export interface UploadFilesOptions {
  multiple?: boolean;
}

export async function uploadFilesFromFormData(
  formData: FormData,
  options: UploadFilesOptions = { multiple: false },
): Promise<number[]> {
  const { multiple } = options;

  const existingFileIds: number[] = [];
  const existingFileIdsRaw = formData.getAll('existingFileIds');

  for (const id of existingFileIdsRaw) {
    const numId = Number(id);
    if (!isNaN(numId)) {
      existingFileIds.push(numId);
    }
  }

  const newFiles: File[] = [];
  const newFilesRaw = formData.getAll('newFiles');

  for (const file of newFilesRaw) {
    if (file instanceof File && file.size > 0) {
      newFiles.push(file);
    }
  }

  const uploadedFileIds: number[] = [];

  if (newFiles.length > 0) {
    if (multiple) {
      for (const file of newFiles) {
        try {
          const uploadedFile = await attachFile({ file });
          if (uploadedFile?.id) {
            uploadedFileIds.push(uploadedFile.id);
          }
        } catch {
          throw new Error(`파일 업로드에 실패했습니다: ${file.name}`);
        }
      }
    } else {
      const file = newFiles[0];
      try {
        const uploadedFile = await attachFile({ file });
        if (uploadedFile?.id) {
          uploadedFileIds.push(uploadedFile.id);
        }
      } catch {
        throw new Error(`파일 업로드에 실패했습니다: ${file.name}`);
      }
    }
  }

  return [...existingFileIds, ...uploadedFileIds];
}
