'use server';

import getNumericArrayFromFormData from '@/shared/lib/getNumericArrayFromFormData';
import { uploadFilesFromFormData } from '@/shared/lib/uploadFilesFromFormData';
import { ActionState } from '@/shared/model/actionState';

import { ProjectFormValues } from '../model/projectForm.schema';
import {
  createProjectOperation,
  deleteProjectOperation,
  draftProjectOperation,
  updateProjectOperation,
} from './projectOperations';
import { executeProjectAction } from './projectTemplate';

export const handleProjectAction = async (
  _prevState: ActionState<ProjectFormValues>,
  formData: FormData,
): Promise<ActionState<ProjectFormValues>> => {
  const intent = formData.get('intent') as string;
  const participantIds = getNumericArrayFromFormData({ formData, key: 'participantIds' });

  let fileIds: number[] = [];
  try {
    fileIds = await uploadFilesFromFormData(formData, { multiple: true });
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : '파일 업로드에 실패했습니다.',
      fieldErrors: null,
      data: {} as ProjectFormValues,
    };
  }

  const data: ProjectFormValues = {
    projectId: formData.get('projectId') ? Number(formData.get('projectId')) : undefined,
    title: String(formData.get('title') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    fileIds: fileIds.length ? fileIds : [],
    participantIds: participantIds,
    isDraft: formData.get('isDraft') === 'true',
  };

  switch (intent) {
    case 'create':
      return executeProjectAction(data, createProjectOperation);
    case 'update':
      return executeProjectAction(data, updateProjectOperation);
    case 'draft':
      return executeProjectAction(data, draftProjectOperation, { isDraft: true });
    case 'delete':
      return executeProjectAction(data, deleteProjectOperation, { skipValidation: true });
    default:
      return {
        status: 'error',
        message: '알 수 없는 작업입니다.',
        fieldErrors: null,
        data,
      };
  }
};
