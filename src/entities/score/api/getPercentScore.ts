import { instance } from "@/shared/lib/instance";

export interface getPercentScoreRequest {
  type: "class" | "grade";
}

export interface getPercentScoreResponse {
  topPercentile: number;
  bottomPercentile: number;
}

export const getPercentScore = async ({ type }: getPercentScoreRequest): Promise<getPercentScoreResponse> => {
  const response = await instance.get(`/scores/percent/${type}`);
  return response.data.data;
}