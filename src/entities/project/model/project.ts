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
