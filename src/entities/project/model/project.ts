import { CategoryNames } from '@/entities/category/model/category';
import { EvidenceType } from '@/entities/evidence/model/evidence';
import { ProjectFileType } from '@/entities/file/model/file';
import { StudentType } from '@/entities/student/model/student';

export interface ProjectType {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  files: ProjectFileType[];
  participants: StudentType[];
  scoreIds: number[];
}

export interface ProjectScoreType {
  scoreId: number;
  categoryNames: CategoryNames;
  scoreStatus: string;
  activityName: string;
  scoreValue: number | null;
  rejectionReason: string | null;
}

export interface ProjectScoreEvidenceGroupType {
  score: ProjectScoreType;
  evidence: EvidenceType;
}
