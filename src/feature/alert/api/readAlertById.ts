import { instance } from '@/shared/lib/instance';

export interface ReadAlertByIdRequest {
  lastAlertId: number;
}

export const readAlertById = async ({ lastAlertId }: ReadAlertByIdRequest) => {
  const response = await instance.patch('/alerts/read', { lastAlertId });
  return response.data;
};
