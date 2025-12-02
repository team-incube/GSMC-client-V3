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

  const existingFileIds = formData
    .getAll('existingFileIds')
    .map((id) => Number(id))
    .filter((num) => !isNaN(num));

  const rawFiles = formData.getAll('newFiles');
  const validFiles = rawFiles.filter((file): file is File => file instanceof File && file.size > 0);

  const filesToUpload = multiple ? validFiles : validFiles.slice(0, 1);

  const uploadPromises = filesToUpload.map(async (file) => {
    try {
      const uploadedFile = await attachFile({ file });
      if (!uploadedFile?.id) {
        throw new Error('Upload successful but ID is missing');
      }
      return uploadedFile.id;
    } catch {
      throw new Error(`파일 업로드에 실패했습니다: ${file.name}`);
    }
  });

  const uploadedFileIds = await Promise.all(uploadPromises);

  return [...existingFileIds, ...uploadedFileIds];
}
