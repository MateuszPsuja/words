import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {switchMap, map, catchError} from 'rxjs/operators';

import { TranslateApiService } from './../../../services/translate-api.service';
import { WordsApiService } from './../../../services/words-api.service';
import { WordsAction } from './words.interfaces';
import * as WordsActions from './words.actions';

@Injectable()
export class WordsEffects {

  @Effect()
  getWord$: Observable<WordsAction> = this.actions$
    .pipe(ofType<WordsAction>(WordsActions.GET_WORD))
    .pipe(
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
    );

  @Effect()
  translateWord$: Observable<WordsAction> = this.actions$
    .pipe(ofType<WordsAction>(WordsActions.TRANSLATE_WORD))
    .pipe(
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
    );

  constructor(
    private actions$: Actions,
    private wordsApiService: WordsApiService,
    private translateApiService: TranslateApiService,
  ) {}
}
