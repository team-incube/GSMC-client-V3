import { instance } from '../lib/axios';

export const attachfile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await instance.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
