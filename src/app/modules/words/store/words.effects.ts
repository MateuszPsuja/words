import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';

import { TranslateApiService } from './../../../services/translate-api.service';
import { WordsApiService } from './../../../services/words-api.service';
import { WordsAction } from './words.interfaces';
import * as WordsActions from './words.actions';

@Injectable()
export class WordsEffects {
  private wordId: string;

  @Effect()
  getWord$: Observable<WordsAction> = this.actions$
    .ofType<WordsAction>(WordsActions.GET_WORD)
    .pipe(
      switchMap(() =>
        this.wordsApiService
          .word()
          .pipe(
            map(data => new WordsActions.GetWordSuccess(data)),
            catchError(error => of(new WordsActions.GetWordError(error))),
          ),
      ),
    );

  @Effect()
  translateWord$: Observable<WordsAction> = this.actions$
    .ofType<WordsAction>(WordsActions.TRANSLATE_WORD)
    .pipe(
      switchMap(action =>
        this.translateApiService
          .translate(action.payload.word, 'en-pl', 0)
          .pipe(
            map(response => ({
              id: action.payload.wordId,
              translation: response.text[0],
            })),
          )
          .pipe(
            map(word => new WordsActions.TranslateWordSuccess(word)),
            catchError(error => of(new WordsActions.TranslateWordError(error))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private wordsApiService: WordsApiService,
    private translateApiService: TranslateApiService,
  ) {}
}
