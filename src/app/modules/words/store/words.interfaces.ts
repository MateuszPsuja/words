import {Action} from '@ngrx/store';

export interface WordsAction extends Action {
  payload?: any;
}

export interface Word {
  word?: string;
  translation?: string;
  id: string;
}

export interface WordState {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  model: Word[];
}
