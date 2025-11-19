export interface CategoryNames {
  englishName: string;
  koreanName: string;
}

export type ScoreStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ScoreType {
  scoreId: number;
  categoryNames: CategoryNames;
  scoreStatus: ScoreStatus;
  activityName: string;
  scoreValue: number;
  rejectionReason: string | null;
}
