export type SignupFormState = {
  name: string;
  studentNumber: number;
  nameError?: string;
  studentNumberError?: string;
};

export const initialState: SignupFormState = {
  name: '',
  studentNumber: 0,
  nameError: undefined,
  studentNumberError: undefined,
};
