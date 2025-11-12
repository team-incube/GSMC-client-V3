import { FileType } from './file';

export interface Evidence {
  scoreId: number;
  title: string;
  content: string;
}

export interface EvidenceResponseType extends Evidence {
  id: string;
  createAt: string;
  updateAt: string;
  file: FileType[];
}

export interface EvidenceRequestType extends Evidence {
  file: number[];
}
