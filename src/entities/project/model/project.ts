import { ProjectFileType } from '@/entities/file/model/file';
import { ScoreType } from '@/entities/score/model/score';
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

export interface ProjectScoreEvidenceType {
  score: ScoreType;
}
