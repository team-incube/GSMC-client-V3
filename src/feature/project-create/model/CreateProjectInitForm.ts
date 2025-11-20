export interface CreateProjectFormState {
  title: string;
  description: string;
  fileIds?: number[] | null;
  participantIds: number[] | null;
}
