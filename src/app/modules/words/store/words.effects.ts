import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {switchMap, map, catchError} from 'rxjs/operators';

import { TranslateApiService } from './../../../services/translate-api.service';
import { WordsApiService } from './../../../services/words-api.service';
import { WordsAction } from './words.interfaces';
import * as WordsActions from './words.actions';

@Injectable()
export class WordsEffects {

  getWord$: Observable<WordsAction> = createEffect(() => this.actions$
    .pipe(
      ofType<WordsAction>(WordsActions.GET_WORD),
      switchMap(() =>
        this.wordsApiService.word().pipe(
          map(wordObject => {
            return {
              id: wordObject.id,
              word: wordObject.word,
            };
          }),
          map(data => new WordsActions.GetWordSuccess(data)),
          catchError(error => of(new WordsActions.GetWordError(error))),
        ),
      ),
    ));

  translateWord$: Observable<WordsAction> = createEffect(() => this.actions$
    .pipe(
      ofType<WordsAction>(WordsActions.TRANSLATE_WORD),
      switchMap(action =>
        this.translateApiService
          .translate(action.payload.word, 'en|pl')
          .pipe(
            map(response => ({
              id: action.payload.id,
              translation: response.responseData.translatedText,
            })),
          )
          .pipe(
            map(word => new WordsActions.TranslateWordSuccess(word)),
            catchError(error => of(new WordsActions.TranslateWordError(error))),
          ),
      ),
    ));

  constructor(
    private actions$: Actions,
    private wordsApiService: WordsApiService,
    private translateApiService: TranslateApiService,
  ) {}
}
