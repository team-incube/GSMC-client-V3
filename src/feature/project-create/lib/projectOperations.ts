import { createDraftProject } from '@/entities/project/api/createDraftProject';
import { createProject } from '@/entities/project/api/createProject';
import { editProjectById } from '@/entities/project/api/editProjectById';
import { removeDraftProject } from '@/entities/project/api/removeDraftProject';
import { removeProjectById } from '@/entities/project/api/removeProjectById';

import { ProjectFormValues } from '../model/projectForm.schema';

export const createProjectOperation = async (formData: ProjectFormValues): Promise<string> => {
  await removeDraftProject();

  await createProject({
    title: formData.title,
    description: formData.description,
    fileIds: formData.fileIds,
    participantIds: formData.participantIds,
  });

  return '프로젝트를 생성했습니다.';
};

export const updateProjectOperation = async (formData: ProjectFormValues): Promise<string> => {
  if (formData.projectId === undefined) {
    throw new Error('Project ID is required for update');
  }

  await editProjectById({
    projectId: formData.projectId,
    title: formData.title,
    description: formData.description,
    fileIds: formData.fileIds,
    participantIds: formData.participantIds,
  });

  return '프로젝트를 수정했습니다.';
};

export const draftProjectOperation = async (formData: ProjectFormValues): Promise<string> => {
  await createDraftProject({
    title: formData.title,
    description: formData.description,
    fileIds: formData.fileIds,
    participantIds: formData.participantIds,
  });

  return '임시저장되었습니다.';
};

export const deleteProjectOperation = async (formData: ProjectFormValues): Promise<string> => {
  if (formData.isDraft) {
    await removeDraftProject();
  } else {
    if (formData.projectId === undefined) {
      throw new Error('Project ID is required for deletion');
    }
    await removeProjectById({ projectId: formData.projectId });
  }

  return '삭제되었습니다.';
};
