export interface S3FileType {
  presignedUrl: string;
  fileKey: string;
  expiresAt: string;
}

export interface FileType {
  id: number | string;
  originalName: string;
  storeName: string;
  uri: string;
}

export interface ProjectFileType extends FileType {
  memberId: number;
}

export const ALLOWED_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.bmp',
  '.webp',
  '.pdf',
  '.doc',
  '.docx',
  '.csv',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
  '.txt',
  '.hwp',
  '.hwpx',
] as const;

export type AllowedExtension = (typeof ALLOWED_EXTENSIONS)[number];
