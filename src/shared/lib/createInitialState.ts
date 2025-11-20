import { ActionState } from '../type/actionState';

export function createInitialState<T>(): ActionState<T> {
  return {
    status: 'idle',
    message: null,
    fieldErrors: null,
    data: null,
  };
}
