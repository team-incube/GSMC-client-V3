import { instance } from '../lib/axios';

export const attachFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await instance.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};
