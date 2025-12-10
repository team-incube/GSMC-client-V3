export interface FileType {
  id: number | string;
  originalName: string;
  storeName: string;
  uri: string;
}

export interface ProjectFileType extends FileType {
  memberId: number;
}
