import { instance } from '@/shared/lib/instance';

export type CalculationType = 'COUNT_BASED' | 'SCORE_BASED';

export type EvidenceType = 'EVIDENCE' | 'FILE' | 'UNREQUIRED';

export interface CategoryType {
  englishName: string;
  koreanName: string;
  weight: number;
  maxRecordCount: number;
  isAccumulated: boolean;
  evidenceType: EvidenceType;
  calculationType: CalculationType;
  isForeignLanguage: boolean;
}

export const getCategories = async (): Promise<CategoryType[]> => {
  const response = await instance.get(`/categories`);
  return response.data.data.categories;
};
