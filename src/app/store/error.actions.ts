import {Action} from '@ngrx/store';

export const SET_ERROR = '[Error] Set error';
export const CLEAR_ERROR = '[Error] Clear error';

export class SetError implements Action {
  readonly type = SET_ERROR;

  constructor(public payload: any) {
  }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;

  constructor() {
  }
}

export type ErrorActions = SetError | ClearError;
