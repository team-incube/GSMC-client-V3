import { EvidenceType } from '@/entities/evidence/model/evidence';
import { CategoryKey, CategoryNames } from '@/shared/type/category';

export type ScoreStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ScoreType {
  scoreId: number;
  categoryNames: CategoryNames;
  scoreStatus: ScoreStatus;
  activityName: string;
  evidence: EvidenceType | null;
  scoreValue: number;
  rejectionReason: string | null;
}

export interface TotalScoreType {
  totalScore: string;
}

export interface CategoryScoresGroupType {
  categoryType: CategoryKey;
  categoryNames: CategoryNames;
  recognizedScore: number;
  scores: ScoreType[];
}
