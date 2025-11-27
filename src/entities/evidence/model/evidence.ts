import { FileType } from '@/entities/file/model/file';

export interface EvidenceType {
  evidenceId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  files: FileType[];
}

export interface DraftEvidenceType {
  title: string;
  content: string;
  fileIds: number[];
}

export type RequiredEvidenceType = 'EVIDENCE' | 'FILE' | 'UNREQUIRED';
