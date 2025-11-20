import { instance } from '@/shared/lib/instance';
import { CreateProjectFormValueType } from '../model/CreateProjectSchema';

export const createProject = async ({
  title,
  description,
  fileIds,
  participantIds,
}: CreateProjectFormValueType) => {
  const response = await instance.post('/projects', {
    title,
    description,
    fileIds,
    participantIds,
  });
  return response.data;
};
