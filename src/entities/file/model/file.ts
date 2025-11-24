export interface FileType {
  id: number;
  fileOriginalName: string;
  fileStoreName: string;
  fileUri: string;
}

export interface ProjectFileType {
  fileId: number;
  memberId: number;
  fileOriginalName: string;
  fileStoreName: string;
  fileUri: string;
}
