'use server';

import { attachFile } from '@/entities/file/api/attachFile';
import { removeFileById } from '@/entities/file/api/removeFileById';
import { FileType } from '@/entities/file/model/file';

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

  const results = await Promise.allSettled(filesToUpload.map((file) => attachFile({ file })));

  const successfulUploads = results.filter(
    (result): result is PromiseFulfilledResult<FileType> => result.status === 'fulfilled',
  );
  const failedUploads = results.filter((result) => result.status === 'rejected');

  if (failedUploads.length > 0) {
    const idsToRollback = successfulUploads
      .map((result) => Number(result.value.id))
      .filter((id): id is number => !isNaN(id));

    if (idsToRollback.length > 0) {
      await Promise.allSettled(idsToRollback.map((id) => removeFileById({ id })));
    }
    throw new Error(`파일 업로드 중 일부가 실패하여 전체 취소되었습니다.`);
  }

  const newUploadedIds = successfulUploads
    .map((result) => Number(result.value.id))
    .filter((id): id is number => !isNaN(id));

  return [...existingFileIds, ...newUploadedIds];
}
