import { ProjectFileType } from '@/entities/file/model/file';
import { ProjectStudentType } from '@/entities/student/model/student';

export interface ProjectType {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  files: ProjectFileType[];
  participants: ProjectStudentType[];
}
