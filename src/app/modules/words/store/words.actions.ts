import {Action} from '@ngrx/store';

import {Word} from './words.interfaces';

export const GET_WORD = '[Words] Get word';
export const GET_WORD_SUCCESS = '[Words] Get word success';
export const GET_WORD_ERROR = '[Words] Get word error';
export const DELETE_WORD = '[Words] Delete word';
export const EDIT_WORD = '[Words] Edit word';
export const CLEAR_DATA = '[Words] Clear data';
export const TRANSLATE_WORD = '[Words] Translate word';
export const TRANSLATE_WORD_ERROR = '[Words] Translate word error';
export const TRANSLATE_WORD_SUCCESS = '[Words] Translate word success';

export class GetWord implements Action {
  readonly type = GET_WORD;
}

export class GetWordSuccess implements Action {
  readonly type = GET_WORD_SUCCESS;

  constructor(public payload: Word) {
  }
}

export class GetWordError implements Action {
  readonly type = GET_WORD_ERROR;

  constructor(public payload: any) {
  }
}

export class DeleteWord implements Action {
  readonly type = DELETE_WORD;

  constructor(public payload: string) {
  }
}

export class EditWord implements Action {
  readonly type = EDIT_WORD;

  constructor(public payload: Word) {
  }
}

export class ClearData implements Action {
  readonly type = CLEAR_DATA;
}

export class TranslateWord implements Action {
  readonly type = TRANSLATE_WORD;

  constructor(public payload: Word) {
  }
}

export class TranslateWordError implements Action {
  readonly type = TRANSLATE_WORD_ERROR;

  constructor(public payload: any) {
  }
}

export class TranslateWordSuccess implements Action {
  readonly type = TRANSLATE_WORD_SUCCESS;

  constructor(public payload: Word) {
  }
}

export type WordsActions =
  GetWord | GetWordSuccess | GetWordError
  | DeleteWord | EditWord | ClearData
  | TranslateWord | TranslateWordError | TranslateWordSuccess;
