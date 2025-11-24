import { FileType } from '@/entities/file/model/file';

export interface EvidenceType {
  evidenceId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  files: FileType[] | null;
}

export type RequiredEvidenceType = 'EVIDENCE' | 'FILE' | 'UNREQUIRED';
