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

export interface GetCategoryBySearchParams {
  keyword: string;
}

export const getCategoryBySearch = async (
  params: GetCategoryBySearchParams,
): Promise<CategoryType[]> => {
  const response = await instance.get(`/categories/search`, { params });
  return response.data.data.categories;
};
